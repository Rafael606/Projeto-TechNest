const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Endereco, sequelize } = require('../data/models');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
    const transacaoDB = await sequelize.transaction();
    try {
        const { nome, email, telefone, password } = req.body;
        const { logradouro, cidade, uf, pais, cep } = req.body;

        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).send('Já existe um usuário com este e-mail já cadastrado.');

        //Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        //Cria novo usuário com senha criptografada
        const newUser = await User.create({
            nome,
            email,
            telefone,
            password: hashedPassword
        }, {transaction: transacaoDB});

        const newEndereco = await Endereco.create({
            logradouro,
            cidade,
            uf,
            pais,
            cep,
            userId: newUser.id
        }, {transaction: transacaoDB});

        await transacaoDB.commit();
        res.status(201).json({newUser, newEndereco});

    } catch (error){
        await transacaoDB.rollback();
        res.status(500).json({ error: `Erro ao cadastrar usuário e endereo. Erro: ${error}`})
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validação de entrada básica para email e senha
    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({ message: 'Formato de e-mail inválido.' });
    }

    try {

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
        }

        // Gera o token apenas com informações essenciais do usuário
        const payload = {
            id: user.id,
            nome: user.nome,
            email: user.email
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('Authorization', `Bearer ${token}`).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const getProfile = async (req, res) => {
    try {
        // Obtenha os dados do usuário logado, incluindo o endereço
        const user = await User.findByPk(req.user.id, {
            include: [{ model: Endereco, as: 'endereco' }] // Inclui o endereço associado ao usuário
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json({
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            logradouro: user.endereco.logradouro,
            cidade: user.endereco.cidade,
            uf: user.endereco.uf,
            pais: user.endereco.pais,
            cep: user.endereco.cep,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar perfil do usuário.' });
    }
};

module.exports = {
    register,
    login,
    getProfile
};


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
        }, { transaction: transacaoDB });

        const newEndereco = await Endereco.create({
            logradouro,
            cidade,
            uf,
            pais,
            cep,
            userId: newUser.id
        }, { transaction: transacaoDB });

        await transacaoDB.commit();
        res.status(201).json({ newUser, newEndereco });

    } catch (error) {
        await transacaoDB.rollback();
        res.status(500).json({ error: `Erro ao cadastrar usuário e endereo. Erro: ${error}` })
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
        const { idUser } = req.params;

        // Obtenha os dados do usuário logado, incluindo o endereço
        const user = await User.findByPk(idUser, {
            include: [{ model: Endereco, as: 'enderecos' }] // Inclui o endereço associado ao usuário
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verifique se o usuário tem pelo menos um endereço associado
        if (!user.enderecos || user.enderecos.length === 0) {
            return res.status(404).json({ message: 'Endereço não encontrado para o usuário.' });
        }

        const endereco = user.enderecos[0];

        res.json({
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            logradouro: endereco.logradouro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            pais: endereco.pais,
            cep: endereco.cep,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar perfil do usuário.' });
    }
};

const updateUser = async (req, res) => {
    const transacaoDB = await sequelize.transaction();
    try {
        const { idUser } = req.params; // Pega o ID do usuário dos parâmetros
        const { nome, email, telefone, password } = req.body; // Dados do usuário a serem atualizados
        const { logradouro, cidade, uf, pais, cep } = req.body; // Dados do endereço a serem atualizados

        // Verifique se o usuário existe
        const user = await User.findByPk(idUser, {
            include: [{ model: Endereco, as: 'enderecos' }] // Inclui o endereço associado
        });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Atualiza os dados do usuário
        const updatedUser = {
            nome: nome || user.nome, // Caso o campo não seja passado, mantém o valor anterior
            email: email || user.email,
            telefone: telefone || user.telefone,
        };

        // Se uma nova senha for fornecida, criptografe-a
        if (password) {
            updatedUser.password = await bcrypt.hash(password, 10);
        }

        // Atualiza o usuário
        await user.update(updatedUser, { transaction: transacaoDB });

        // Verifique se o usuário tem pelo menos um endereço associado
        if (user.enderecos && user.enderecos.length > 0) {
            const endereco = user.enderecos[0]; // Pega o primeiro endereço associado

            // Atualiza o endereço
            const updatedEndereco = {
                logradouro: logradouro || endereco.logradouro,
                cidade: cidade || endereco.cidade,
                uf: uf || endereco.uf,
                pais: pais || endereco.pais,
                cep: cep || endereco.cep,
            };

            await endereco.update(updatedEndereco, { transaction: transacaoDB });
        }

        // Confirma a transação
        await transacaoDB.commit();

        res.status(200).json({ message: 'Usuário e endereço atualizados com sucesso.' });

    } catch (error) {
        // Reverte a transação em caso de erro
        await transacaoDB.rollback();
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário e endereço.' });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateUser
};


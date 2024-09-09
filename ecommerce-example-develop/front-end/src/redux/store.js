import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,        // Função para criar o persistor, que sincroniza o estado com o localStorage.
  persistReducer,      // Função que combina a persistência de estado com o reducer.
  FLUSH,               // Ação do redux-persist relacionada à persistência (esvaziar o buffer de gravação).
  REHYDRATE,           // Ação para reidratar o estado quando a aplicação recarrega.
  PAUSE,               // Ação para pausar a persistência (geralmente usada ao sair da aplicação).
  PERSIST,             // Ação que inicializa a persistência do estado.
  PURGE,               // Ação para limpar o estado persistido.
  REGISTER,            // Ação para registrar o persistente no store.
} from "redux-persist"; 
import storage from "redux-persist/lib/storage"; // Usa o localStorage do navegador para armazenar o estado.
import orebiReducer from "./orebiSlice"; // Importa o reducer principal da aplicação (definido no orebiSlice).

// Configuração para o redux-persist
const persistConfig = {
  key: "root",   // A chave "root" será usada para salvar o estado persistido no localStorage.
  version: 1,    // Versão do estado persistido, útil para migrações de versão.
  storage,       // Define o localStorage como o local de armazenamento do estado.
};

// Cria um reducer persistente combinando a configuração de persistência com o reducer principal da aplicação.
const persistedReducer = persistReducer(persistConfig, orebiReducer);

// Configura a store global do Redux usando configureStore
export const store = configureStore({
  reducer: { orebiReducer: persistedReducer }, // Define o reducer principal como o persistido.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configurações para evitar erros de serialização relacionados a ações do redux-persist.
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignora essas ações relacionadas à persistência.
      },
    }),
});

// Cria o persistor, que gerencia a persistência e reidratação do estado.
export let persistor = persistStore(store);

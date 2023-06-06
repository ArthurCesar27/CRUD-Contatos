// controllers/AgendasController.js

const Contact = require('../models/contact');

const AgendasController = {
  // Método para criar um novo contato na Agenda
  create: async (req, res) => {
    try {
      const { nome, celular, email, rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

      // Crie o novo contato
      const contact = await Contact.create({
        nome,
        celular,
        email,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento
      });

      // Retorne o contato criado
      res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar contato' });
    }
  },

  // Método para obter todos os contatos da Agenda
  getAll: async (req, res) => {
    try {
      // Obtenha todos os contatos
      const contacts = await Contact.findAll();

      // Retorne os contatos encontrados
      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao obter contatos' });
    }
  },

  // Método para obter um contato específico da Agenda
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      // Obtenha o contato pelo ID
      const contact = await Contact.findByPk(id);

      // Verifique se o contato foi encontrado
      if (!contact) {
        return res.status(404).json({ message: 'Contato não encontrado' });
      }

      // Retorne o contato encontrado
      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao obter contato' });
    }
  },

  // Método para atualizar um contato da Agenda
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, celular, email, rua, numero, bairro, cidade, estado, cep, complemento } = req.body;

      // Verifique se o contato existe
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contato não encontrado' });
      }

      // Atualize o contato
      await contact.update({
        nome,
        celular,
        email,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento
      });

      // Retorne o contato atualizado
      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar contato' });
    }
  },

  // Método para remover um contato da Agenda
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Verifique se o contato existe
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contato não encontrado' });
      }

      // Remova o contato
      await contact.destroy();

      // Retorne uma resposta de sucesso
      res.json({ message: 'Contato removido com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao remover contato' });
    }
  }
};

module.exports = AgendasController;

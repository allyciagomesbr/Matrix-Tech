const Roupa= require('./model/roupa.model');
const Usuario= require('./model/usuario.model');
const Gestao= require('./model/gestao.model');
const express  = require ('express');
const exphbs = require ('express-handlebars');
const sequelize = require('./config/bd');
const methodOverride = require('method-override');
const app = express();

app.engine(
    'handlebars',
    exphbs.engine({defaultLayout:false}),
);

app.use(
    express.urlencoded({extended: true})
);


app.use(methodOverride('_method'));

app.set(
        'view engine',
        'handlebars'
    );
app.post(
     '/cadastrousuario',
    async (req,res) => {
        const {email, telefone, nome,} = req.body;

        await Usuario.create({
            email:email,
            telefone:telefone,
            nome:nome,
          
        });

        res.redirect('/usuario');
    }
);

app.post (
    '/cadastrousuario',
    async (req,res) => {
        const {email,telefone,nome} = req.body;

        await Usuario.create({
            email: req.body.email,
            telefone: req.body.telefone,
            nome: req.body.nome,
           


        });

        res.redirect ('/usuario');
    }
);


app.get(
    '/cadastrousuario',
    (req, res) => res.render('cadastroUsuario')
);

app.get(
    '/usuario',
    async(req,res) => {
        const usuario = await Usuario.findAll({raw:true});
        res.render('listarUsuario',{usuario: usuario})
    }
);






app.get(
    '/gestao/cadastro',
    (req, res) => res.render('cadastroGestao')
);

app.post (
    '/gestao/cadastro',
    async (req,res) => {
        const {email,telefone,nome,idade} = req.body;

        await Gestao.create({
            email: req.body.email,
            telefone: req.body.telefone,
            nome: req.body.nome,
            idade: req.body.idade



        });

        res.redirect ('/gestao');
    }
);


app.get(
    '/gestao',
    async(req,res) => {
        const gestao = await Gestao.findAll({raw:true});
        res.render('listarGestao',{gestao: gestao})
    }
);

app.post(
    '/gestao',
    async (req,res) => {
        const {email, telefone, nome, idade} = req.body;

        await Gestao.create({
            email:email,
            telefone:telefone,
           nome:nome,
            idade:idade
        });

        res.redirect('/gestao');
    }
);
app.post(
    '/roupas',
    async (req,res) => {
        const {peca, tecido, valor, imagem} = req.body;

        await Roupa.create({
            peca:peca,
            tecido:tecido,
            valor:valor,
            imagem:imagem

        });

        res.redirect('/roupas');
    }
);


app.get(
    '/roupas/cadastrar',
    (req, res) => res.render('cadastrarRoupas')
);


app.post (
    '/roupas/cadastrar',
    async (req,res) => {
        const {peca,tecido,valor,imagem} = req.body;

        await Roupa.create({
            peca: req.body.peca,
            tecido: req.body.tecido,
            valor : req.body.valor,
            imagem: req.body.imagem



        });

        res.redirect ('/roupas');
    }
);
app.get(
    '/roupas/:id/editar',
    async (req,res)=> {
        const id = req.params.id;
        let roupa = await Roupa.findByPk(id, {raw:true})

        res.render('editarRoupa',{ roupa })
    }
);


app.put(
    '/roupas/:id',
    async(req, res) => {
        const id = req.params.id;
        const peca = req.body.peca;
        const tecido = req.body.tecido;
        const valor = req.body.valor;
        const imagem = req.body.imagem;

        const roupas = await Roupas.findByPk(id);

        roupas.peca = peca;
        roupas.tecido = tecido;
        roupas.valor = valor;
        roupas.imagem = imagem;
        roupas.save();

        res.redirect('/');
    }
)


app.get(
    '/roupas',
    async(req,res) => {
        const roupas = await Roupa.findAll({raw:true});

        console.log ("DADOS DO BANCO:",roupas);
        res.render('listarRoupas',{roupas: roupas})
    }
);

app.get(
    '/',
    (req,res) => res.render('home')
);


app.post(
    '/roupas/excluir/:id',async (req,res) => {
        const id = req.params.id;
        const roupa =await Roupa.findByPk(id);

        if (roupa){
            await roupa.destroy();
        }

        res.redirect('/roupas');
    }
);




async function conectarBD() {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD();

app.listen(
    3000,
    () => console.log ('Servidor em execução')

);

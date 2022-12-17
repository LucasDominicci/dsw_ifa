<template>
    <div>
        <!-- <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script> -->

        <div id="rodape_lateral">
            <div class="invent-cards">
                <!-- <img id="logo_app" src="~/assets/logo.png" /> -->
            </div>

            <div id="buttons_nav">
                <!-- Botão de Inicio -->
                <b-navbar-nav>
                    <b-nav-item class='icons_nav_menu' v-on:click="desativa_views(0)">
                        <p class="buttn_icon_menu">Página inicial</p>
                    </b-nav-item>

                    <!-- Botão do marketplace -->
                    <b-nav-item class='icons_nav_menu' v-on:click="
                    desativa_views(1)">
                        <p class="buttn_icon_menu">Produtos</p>
                    </b-nav-item>

                    <!-- Botão de Ações -->
                    <b-nav-item class='icons_nav_menu' v-on:click="
                    desativa_views(2)">
                        <p class="buttn_icon_menu">Carrinho de compras</p>
                    </b-nav-item>
                </b-navbar-nav>
            </div>
        </div>

        <!-- Tela inicial com várias funções de conta -->
        <div class="invent-cards content_page" v-if="inicioView">
            <h2>Bem vindo a padaria</h2>
            <hr />
        </div>

        <!-- Listad de produtos -->
        <div class="invent-cards content_page" v-if="produtoView">
            <div>
                <h2>Produtos da padoca</h2>

                <a href="#" class="icon_carrinho_compras" v-on:click="abrir_carrinho()">
                    <h2 id="text_carrinho">Carrinho <i class="fas fa-dolly"></i></h2>
                </a>
            </div>
            <hr />
            <!-- <input type="text" class="search" placeholder="Pesquisar por um produto"> -->

            <hr v-if="(produtos.length > 0)" />
            <h4 v-if="(produtos.length > 0)">Produtos em destaque <i class="fas fa-store"></i></h4>

            <!-- Produtos do marketplace -->
            <div id="lista_itens_marketplace">
                <div v-for="produto in produtos">

                    <a href="#">
                        <div class="item_marketplace">
                            <h3 class="nome_item_marketplace">{{ produto.nome }}</h3>

                            <p class="preco_item_marketplace">R${{ produto.preco }}</p>

                            <div class="opcoes_item">
                                <p class="btn_opcao_item" v-b-modal.modal-produto
                                    v-on:click="objeto_edita(1, produto.id)"><i class="fas fa-pen"></i></p>

                                <p class="btn_opcao_item btn_opcao_excluir"
                                    v-on:click="removeSelectedProduto(produto.id)"><i class="fas fa-trash"></i></p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- Carrinho de compras -->
        <div id="painel_carrinho_preview" v-if="carrinhoPainelView">

            <h2>Seu carrinho de compras <i class="fas fa-"></i></h2>

            <!-- <div>
                <hr />
                <h3>Seu carrinho está vazio! Adicione produtos para poder visualizar por aqui!</h3>
            </div> -->

            <a href="#" class="a_btn_link">
                <p class="btn_item btn_retornar_pag" style="float: right; margin-top: 25px;"
                    v-on:click="carrinhoPainelView = false">Retornar</p>
            </a>
        </div>

        <!-- Modal para inserir ou editar produto -->
        <b-modal id="modal-produto" :title="titulo_modal" hide-footer>
            <b-overlay :show="prancheta_produto" rounded="sm">
                <b-form v-on:submit="operacao">
                    <label class="mr-sm-2" for="input_nome_produto">Nome do item:</label>
                    <b-form-input id="input_nome_produto" v-model="objetoProduto.nome" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Bolo de chocolate" required></b-form-input> <br />

                    <label class="mr-sm-2" for="input_quantidade">Quantidade em estoque:</label>
                    <b-form-input v-model="objetoProduto.quantidade" id="input_quantidade" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_preco">Preço:</label>
                    <b-form-input v-model="objetoProduto.preco" id="input_preco" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_tipo">Categoria:</label>
                    <b-form-select id="input_tipo" v-bind:options="categorias_produto" v-model="objetoProduto.categoria"
                        v-bind:value="null" required>
                    </b-form-select> <br /> <br />

                    <b-button v-if="!btn_edit_produto" type="submit" variant="primary"
                        v-on:click="prancheta_produto = !prancheta_produto">Cadastrar</b-button>
                    <b-button v-if="btn_edit_produto" type="submit" variant="primary"
                        v-on:click="btn_edit_produto = !btn_edit_produto">Atualizar</b-button>

                    <b-button type="reset" variant="danger">Limpar formulário</b-button>
                </b-form>
            </b-overlay>
        </b-modal>
    </div>
</template>

<script>
export default {
    async asyncData({ store, $axios, redirect }) {

        const authToken = 'null'
        // se tiver carregando client side, recupera o token do usuário

        // Check if user is logged in.
        if (authToken === null) {
            // This means that there ISN'T JWT and no user is logged in.
            $axios.defaults.headers.common.Authorization = null;
            redirect("/");
        } else {
            // This means that there IS a JWT so someone must be logged in.
            $axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
            // salva o token para usar nos headers nas requisições
        }

        let produtos, carrinho;
        const identificador = 1;

        try {
            const response = await $axios.$get('produto');
            produtos = response;
        } catch (ex) {
            console.log(ex);
        }

        // try{
        //     const response = await $axios.$get('carrinho');
        //     itens_carrinho = response;
        // } catch (ex) {
        //     console.log(ex);
        // }

        return { produtos, carrinho }
    },

    name: 'IndexPage',
    data: function () {
        return {
            show: false,
            inicioView: true,
            produtoView: false,
            carrinhoView: false,

            produtosRegistradosView: false,
            carrinhoPainelView: false,

            operacao: this.createNewLoja,

            titulo_modal: 'Cadastro de produto',

            btn_edit_produto: false,

            prancheta_produto: false,

            categorias_produto: [
                { text: "Selecione um:", value: null },
                "Pães",
                "Bolos",
                "Bebidas"
            ],

            objetoProduto: {
                nome: null,
                quantidade: null,
                categoria: null,
                preco: null
            },

            produtos: [],
            itens_carrinho: [],
        };
    },

    methods: {

        deslogar: function () {
            window.location.href = "/";
        },

        objeto_adicionar: function (caso) {

            this.objetoProduto = {
                nome: null,
                quantidade: null,
                categoria: null,
                preco: null
            },

                this.btn_edit_produto = false;
            this.titulo_modal = "Cadastro de Produto";
            this.operacao = this.createNewProduto;
        },

        desativa_views: function (alvo) {

            this.inicioView = false;
            this.produtoView = false;
            this.carrinhoView = false;

            // 0 -> Inicio, 1 -> Produtos, 2 -> Carrinho
            if (alvo == 0)
                this.inicioView = true;
            else if (alvo == 1)
                this.produtoView = true;
            else
                this.carrinhoView = true;
        },

        objeto_edita: function (caso, id_alvo) {

            this.$axios.$get(`produto/${id_alvo}`).then((response) => {
                this.objetoProduto = response[0];

                this.titulo_modal = "Atualizar Produto";
                this.operacao = this.updateSelectedProduto;
                this.btn_edit_produto = true;
            });
        },

        abrir_carrinho: function () {

            this.carrinhoPainelView = true;
        },

        createNewProduto: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("produto", this.objetoProduto)
                .then(() => {
                    this.updateProduto();

                    // Atualizando a lista de itens da loja
                    this.atualiza_itens_loja(this.objetoProduto.idLoja)

                    this.$bvModal.hide('modal-produto');
                    this.operacao = this.createNewProduto;
                })
                .catch((error) => {
                    console.error('Não foi possível criar um novo produto');
                    console.log(error);
                });
        },

        updateSelectedProduto: function (event) {
            event.preventDefault();

            this.$axios
                .$post("produto/update", this.objetoProduto)
                .then(() => {
                    this.updateProduto();

                    this.$bvModal.hide('modal-produto');
                    this.operacao = this.createNewProduto;
                })
                .catch((error) => {
                    console.error('Não foi possível atualizar o produto selecionado.');
                    console.log(error);
                });
        },

        updateProduto: function () {
            this.$axios.$get("produto").then((response) => {
                this.produtos = response;

                this.$bvModal.hide('modal-produto');
                this.operacao = this.createNewProduto;

                if (this.produtos.length < 1)
                    this.produtosRegistradosView = false;
            })
        },

        removeSelectedProduto: function (id) {
            this.$axios.$delete(`produto/${id}`).then(() => {
                this.updateProduto();
            })
        },
    }
}
</script>

<style scoped>
@import '../static/style.css';
</style>
<template>
  <div class="login">
    <section class="section">
        <div class="columns is-mobile is-centered">
            <div class="card column is-12-mobile is-8-tablet is-5-desktop">
                <div class="card-image">
                    <div class="media-center"></div>
                    <figure class="image">
                        <img src="../assets/img/logo.png" alt="Business View Report">
                    </figure>
                </div>
                <div class="card-content">
                    <section>
                        <b-field label="LOGIN">
                            <b-input placeholder="nome@email.com.br"></b-input>
                        </b-field>
                        <b-field label="SENHA">
                            <b-input type="password" password-reveal></b-input>
                        </b-field>
                    </section>
                    <div class="columns  is-gapless">
                        <div class="column ">
                            <a class="button is-primary">ENTRAR</a>
                        </div>
                    </div>
                    <div class="columns  is-gapless">
                        <div class="column">
                            <a class="button is-success">Criar uma nova conta</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String
  }
};
</script>

<style lang="scss">
body {
    .section {
        padding-top: 125px;
        .card {
        border-radius: 6px;
        .card-image {
            .image img {
            margin: auto;
            margin-top: 34px;
            width: 289px;
            height: 121px;
            image-rendering: auto;
            image-rendering: crisp-edges;
            image-rendering: pixelated;
            }
        }
        .card-content {
            width: 420px;
            margin: auto;
            margin-top: 11px;
            max-width: 100%;
            .field {
            margin-bottom: 26px;
            font-family: "Roboto";
            font-weight: 400;

            label {
                font-weight: 500;
                color: #676767;
            }

            input {
                border-color: #e5e5e5;
                background: #f2f2f5;
                transition: all ease 0.3s;
            }
            .input:focus {
                -webkit-box-shadow: 0 0 0 0.125em rgba(158, 158, 158, 0.33);
                box-shadow: 0 0 0 0.125em rgba(158, 158, 158, 0.33);
            }
            }
            .button {
            font-family: "Open Sans";
            font-weight: 700;
            padding: 21px 13px;
            font-size: 18px;
            }
            .button.is-primary {
            background-color: #f58733;
            margin-top: 22px;
            margin-bottom: 75px;
            }
            .button.is-success {
            background-color: #c1d7aa;
            margin-bottom: 29px;
            }
            .field,
            a {
            width: 100%;
            }
        }
        }
    }
    .overlay {
        background-image: url(../assets/img/bg.jpg);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }
}
</style>

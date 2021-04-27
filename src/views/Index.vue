<template>
    <div class="index">
        <section id="hero">
            <v-row no-gutters>
                <v-img
                    height="80vh"
                    src="../assets/index.jpg"
                >
                    <v-theme-provider dark>
                        <v-container fill-height>
                            <v-row
                                align="center"
                                class="white--text mx-auto"
                                justify="center"
                            >
                                <v-col
                                    class="white--text text-center"
                                    cols="12"
                                    tag="h1"
                                >
                    <span
                        :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                        class="font-weight-light"
                    >
                      WELCOME TO
                    </span>

                                    <br>

                                    <span
                                        :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                                        class="font-weight-black"
                                    >
                      CSFLOW
                    </span>

                                </v-col>

                                <v-btn
                                    class="align-self-end"
                                    color="primary"
                                    to="/auth/signIn"
                                    style="text-decoration: none"
                                >
                                    Get Started
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-theme-provider>
                </v-img>
            </v-row>
        </section>

        <section id="about-me">
            <div class="py-12"></div>

            <v-container class="text-center">
                <h2 class="display-2 font-weight-bold mb-3">ABOUT CSFLOW</h2>

                <v-responsive
                    class="mx-auto mb-8"
                    width="56"
                >
                    <v-divider class="mb-1"></v-divider>

                    <v-divider></v-divider>
                </v-responsive>

                <v-responsive
                    class="mx-auto title font-weight-light mb-8"
                    max-width="720"
                >
                    We solve, we share, we expand.<br>
                    It's a platform of CSE, BUET to solve and share solutions.<br>
                    CSFlow is where students solve and share term exam questions for maximum distribution and get answers of
                    the most difficult questions there is.

                </v-responsive>

                <div></div>
            </v-container>

            <div class="py-12"></div>
        </section>

        <section
            id="features"
            class="grey lighten-3"
        >
            <div class="py-12"></div>

            <v-container class="text-center">
                <h2 class="display-2 font-weight-bold mb-3">FEATURES OF CSFLOW</h2>

                <v-responsive
                    class="mx-auto mb-12"
                    width="56"
                >
                    <v-divider class="mb-1"></v-divider>

                    <v-divider></v-divider>
                </v-responsive>

                <v-row>
                    <v-col
                        v-for="({ icon, title, text }, i) in features"
                        :key="i"
                        cols="12"
                        md="4"
                    >
                        <v-card
                            class="py-12 px-4"
                            color="grey lighten-5"
                            flat
                        >
                            <v-theme-provider dark>
                                <div>
                                    <v-avatar
                                        color="primary"
                                        size="88"
                                    >
                                        <v-icon
                                            large
                                            v-text="icon"
                                        ></v-icon>
                                    </v-avatar>
                                </div>
                            </v-theme-provider>

                            <v-card-title
                                class="justify-center font-weight-black text-uppercase"
                                v-text="title"
                            ></v-card-title>

                            <v-card-text
                                class="subtitle-1"
                                v-text="text"
                            >
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <div class="py-12"></div>
        </section>

        <section id="stats">
            <v-parallax
                :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
                src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            >
                <v-container fill-height>
                    <v-row class="mx-auto">
                        <v-col
                            v-for="[value, title] of stats"
                            :key="title"
                            cols="12"
                            md="3"
                        >
                            <div class="text-center">
                                <div
                                    class="display-3 font-weight-black mb-4"
                                    v-text="value"
                                ></div>

                                <div
                                    class="title font-weight-regular text-uppercase"
                                    v-text="title"
                                ></div>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-parallax>
        </section>

        <section id="blog">
            <div class="py-12"></div>

            <v-container>
                <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">AVAILABLE ON</h2>

                <v-responsive
                    class="mx-auto mb-12"
                    width="56"
                >
                    <v-divider class="mb-1"></v-divider>

                    <v-divider></v-divider>
                </v-responsive>

                <v-row>
                    <v-col
                        v-for="({ src, text, title }, i) in platforms"
                        :key="i"
                        cols="12"
                        md="4"
                    >
                        <v-img
                            :src="src"
                            class="mb-4"
                            height="275"
                            max-width="100%"
                        ></v-img>

                        <h3
                            class="font-weight-black mb-4 text-uppercase"
                            v-text="title"
                        ></h3>
                    </v-col>
                </v-row>
            </v-container>

            <div class="py-12"></div>
        </section>

        <v-sheet
            id="contact"
            color="#333333"
            dark
            tag="section"
            tile
        >
            <div class="py-12"></div>

            <v-container>
                <h6 class="mb-3 text-uppercase text-center">A product of <br>Department of Computer Science and Engineering of<br>Bangladesh University of Engineering and Technology</h6>
            </v-container>

            <div class="py-12"></div>
        </v-sheet>
    </div>
</template>
<script>
export default {
    name: "Index",
    data() {
        return {
            platforms: [
                {
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8ODg4AAAAICAjh4eF9fX0zMzNOTk7X19cqKiphYWGsrKwKCgr7+/vm5uZ0dHS8vLzu7u5DQ0OdnZ3Nzc1TU1OTk5O/v7+GhoZJSUl5eXlYWFi2trZmZmbx8fEmJiZubm45OTkeHh4YGBjIyMijo6Ourq6YmJiDg4OqYIa4AAAEDUlEQVR4nO3cWWOiMBQFYLmIomLdWxds1S76/3/hAC4VSpxOPc690vM985AjCTcJkVqNiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOiXCTtBoN2GGxr3JPGi3Yyb6bdEIs/zX7UbciNhQ8RLSUO7KbexO+RLEja123ILz41jviThXLs1N1CXz4CevGs3B68uvneWMNRuD9xzLmAk2u3Ba5110UoOwyAXsIKdNCwEbGk3CK5RSNjXbhBavxCwehOaVtVH4bgQsHorp16+UlTvMVNLl0snvgy02wOXKxW+1LXbg9c5n3FXMWCyKjwbg9Xroon2adlbwadoZnHYuJBh5ergwUL8dHdtMdZuyM2s5HUYxM/azaDvCePRNAge4wsDrt4Jmpuk067b0/jOKsfgvSmf2nG35JqnbL9b/CiK9pfN3/57O3/qLY33WdnTAMtC68OdSG4Ct79sVPZTmDNuSH79sC8P0fZU4LudRjHeKaT9ncVuuyTffhIqs04y2Ab9pTguyTK2jA/Isbvx6Y3cc1+RXfShHeKSUWnn+0cy1Y7hFly+Pd+OaHbKCgqYRHzUjlJuiwqYRDRZGp9wAZPHjcHC+Ix4yBwDvlgsGU1gH11qhynTBwa0WS1yrwSvC2jzQfoOu4Wy085SDnYLZaIdpRysUvgWy0RqApvNmCz1aS1EBWxrR3H4gCW0ug2+BCWUlXYSF9SEzewL4QfQLfQ32klcULXC6GymhlsYitm3GT1UQqPVHrZwijztIE4bzKRUZtpBnEDFwubCN4NK2NMO4lT5GQ0soeFeCko41A7iBBqHhg98+6iJt9mKv678rG1R+Zk36p2T3dOmI9gmhsXXFSnYXqLV3eBaHbfhbfVpikto9f02qlzYHYk7XEKjj1Pky0Ob/2QbIF/h2zz3BdrH2EfsaKcpMwXeRE9G2nFKvCET2tzOAB41SSMaPKC4gt5ET2RqbXaD7aZZRmtLKWw39QzuD0OfplnCWDtSAW59cUxobSDWZuBnjb2KgTx86dl84f0KnLl5staOU6IDnbk9accpgzueaPXMAvAmmisVB7CRaPb7ZrhdRaPn92A10fDHv0CHo+RBO4jbIyKiuVVFTuv6iFY3FA8A/dTqpvDR1Yf2Zasd4W+uPPJt+LjCUfeqyVskd/A1gvCam2i31p+7Yn5q9C9PX/z4vb4stJv+Xc6z+5GffUXBFdD+U+akXRIx+zbEZjZptuTL9xTuLmDJwegk1Co+zjcH/d7Xv+Wb/b+MQ6fwZYxh8fOI8TqXUUy+cbroYSL7ypgOvXnZTCxcHbpr2n/bhtcTTmGQfSdi03N+3bLbn6/TS5rbe8yX6Q6s/lWLiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIfq8/tzAurNL1lJsAAAAASUVORK5CYII=',
                    title: 'MAC OSX',
                },
                {
                    src: 'https://46c4ts1tskv22sdav81j9c69-wpengine.netdna-ssl.com/wp-content/uploads/prod/sites/2/2020/08/windows-logo-social.png',
                    title: 'Windows 10',
                },
                {
                    src: 'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fblogs-images.forbes.com%2Fjasonevangelho%2Ffiles%2F2018%2F07%2Fubuntu-logo.jpg',
                    title: 'Ubuntu',
                },
                {
                    src: 'https://miro.medium.com/max/1024/1*6B0hnPejERl2D768U4vb1w.jpeg',
                    title: 'Android'
                },
                {
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/1200px-IOS_logo.svg.png',
                    title: 'iOS'
                },
                {
                    src: 'https://cdn.pixabay.com/photo/2016/11/30/17/10/web-1873373_1280.png',
                    title: 'Web'
                }
            ],
            features: [
                {
                    icon: 'mdi-account-group-outline',
                    title: 'Vibrant Community',
                    text: 'Ask questions and get answers from the top tier academics of the Department of Computer Science and Engineering of BUET',
                },
                {
                    icon: 'mdi-pencil',
                    title: 'Updated Contents',
                    text: 'Edit, update and comment on answers to keep the contents up to date.',
                },
                {
                    icon: 'mdi-help',
                    title: 'Question Bank',
                    text: 'Get questions and answers to all the questions of term final exams from previous years',
                },
            ],
            stats: [
                ['542', 'Students'],
                ['56', 'Teachers'],
                ['1025', 'Posts'],
                ['945', 'Answers'],
            ],
        }
    }
}
</script>
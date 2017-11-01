export default {
    data() {
        return {
            menuIndex: '/'
        }
    },
    mounted() {
        this.changeMenuByRoute()
    },
    watch: {
        $route() {
            this.changeMenuByRoute()
        }
    },
    methods: {
        changeMenuByRoute() {
            switch (this.$route.path) {
                case '/':
                    this.menuIndex = '/';
                    break;
                case '/info':
                    this.menuIndex = '/info';
                    break;
                default:
                    this.menuIndex = '/';
                    break;
            }
        }
    }
};

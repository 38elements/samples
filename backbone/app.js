window.addEventListener('DOMContentLoaded', () => {
    const Bb = Backbone;
    const Mn = Backbone.Marionette;


    var controller = {
        show: function(id) {
            console.log(id)
        router.navigate('save/_save', {trigger: true, replace: true});
        },
        save: function(id) {
            console.log(id)
        },
    };

    class BaseView extends Mn.View {
        template(data) {
            return Handlebars.compile('<span>Hello, {{ name }}</span>')(data);
        }
        store() {
            this.inputIds = [];
            let texts = Array.from(document.querySelectorAll('input[type=text]'));
            texts.forEach((t) => {this.model.set(t.id, t.value);this.inputIds.push(t.id);});
            let redios = Array.from(document.querySelectorAll('input[type=redio]'));
            redios.forEach((t) => {this.model.set(t.id, t.checked);this.inputIds.push(t.id);});
            let checkboxes = Array.from(document.querySelectorAll('input[type=checkboxes]'));
            checkboxes.forEach((t) => {this.model.set(t.id, t.checked);this.inputIds.push(t.id);});
            let textareas = Array.from(document.querySelectorAll('textarea'));
            textareas.forEach((t) => {this.model.set(t.id, t.value);this.inputIds.push(t.id);});
            let selects = Array.from(document.querySelectorAll('select'));
            selects.forEach((t) => {this.model.set(t.id, t.value);this.inputIds.push(t.id);});
        }
        delivery() {
            this.inputIds.forEach((id) => {
                let input = document.getElementById(id);
                if (input.nodeName == 'INPUT' && input.type == 'text') {
                    input.value = this.model.get(id);
                }
                else if(input.nodeName == 'INPUT' && input.type == 'redio') {
                    input.checked = this.model.get(id);
                }
                else if(input.nodeName == 'INPUT' && input.type == 'checkbox') {
                    input.checked = this.model.get(id);
                }
                else if (input.nodeName == 'INPUT' && input.type == 'testarea') {
                    input.value = this.model.get(id);
                }
                else if (input.nodeName == 'INPUT' && input.type == 'select') {
                    input.value = this.model.get(id);
                }
            });
        }
    }
    class MyView extends BaseView {
        constructor(id) {
            super({
                id,
                tagName: 'h1',
                template: '#container_template'
            })
        }
        static create(id) {
            let view = new this(id);
            return view;
        }
    };
    class BarView extends BaseView {
        constructor() {
            super({
                tagName: 'div'
            });
        }
        // getter, setterを書かないと属性にアクセスできない
        id() {
            return 'apple';
        }
        templateContext() {
            return {name: 'World!'}
        }
        static create() {
            let view = new this();
            view.on('render', function() {
                /*
                 * 子ビューはここで設定する
                this.showChildView('side1', new View1());
                this.showChildView('side2', new View2());
                */
            });
            return view;
        }
    };


    class Router extends Mn.AppRouter {
        constructor(options) {
            super({
                controller: options.controller,
                appRoutes: options.appRoutes
            })
        }
        static create(options) {
            let router = new this(options);
            router.on('routes', (name, path, args) => {
                // ここでapp.showView(view)で全体のレイアウトを切り替えることも可能
                console.log(name);
                console.log(path);
                console.log(args);
            });
            return router;
        }
    };
    let router = Router.create({
        controller: controller,
        appRoutes: {
            'save/:id': 'save',
            'show/:id': 'show'
        }
    });



    class MyApplication extends Mn.Application {
        
        constructor(options) {
            super({
                region: '#container'
            });
            console.log('constructor');
        }

        initialize(options) {
            // initializeを実行したあとにconstructorを実行する
            console.log('initialize');
        }

        static create(options) {
            let app = new this(options);
            app.on('start', function(app, options) {
                console.log('onStart');
                Bb.history.start();
                // console.dir(this)
                // console.dir(app)
                this.showView(MyView.create('car'));
                // change root view
                this.showView(BarView.create());
                router.navigate('show/_show', {trigger: true, replace: true});
            });
            return app;
        }
    };
    let app = MyApplication.create({'foo': 3456});


    let loading = new Promise((resolve, reject) => {
        setTimeout(() => {resolve();}, 100);
    });
    loading
        .then(() => {app.start({foo: 1234});})
});

/**
 * Created by AmitKumarJha on 8/19/2016.
 */

class appController{
    constructor($interval){
        var self = this;
        this.languageList = [
            "java",
            "c++",
            "c",
            "perl",
            "python",
            "javascript",
            "html",
            "css",
            "sql",
            "ruby",
            "bash",
            "php",
            "JSON"
        ]
    }

    changeLang(lang){
        this.language = lang;
    }
}
appController.$inject =['$interval']

export default appController;

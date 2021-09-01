const Rule = require( './lib/rule' )

const OPTIONS = {
    ruleData: {},   // 路由信息
    ajax: function () {
    }
}

const HEADERS = {
    'content-type': 'application/json'
}

function AjaxRouter ( options = {} ) {
    if ( !( this instanceof AjaxRouter ) ) {
        return new AjaxRouter()
    }

    // 默认参数
    this._options = Object.assign( OPTIONS, options )

    this._rule = new Rule( this._options.ruleData )

    return this
}

AjaxRouter.prototype.request = function ( url, params = {} ) {
    return new Promise( ( resolve, reject ) => {
            let ruleObj = this._rule.parse( url )

            // 处理参数
            ruleObj = Rule.paramsPlant( ruleObj, params )

            this._options.ajax( {
                method: ruleObj.type,
                type: ruleObj.ruleType,
                url: ruleObj.path,
                headers: HEADERS,
                params: params,
                originPath: ruleObj.originPath
            }, resolve, reject )
        }
    )
}

module.exports = AjaxRouter

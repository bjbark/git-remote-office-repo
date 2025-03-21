/**
 * 검색 폼 패널
 *
 * {@link #getFields}와 {@link #getValues}는 {@link Ext.form.Panel }의 것을 그대로 사용
 */
Ext.define('Axt.form.Search', { extend:'Axt.form.Panel'
	,
	xtype: 'form-search',
    frame: true,
    style: 'padding-top : 0;padding-bottom : 2;padding-left : 0;padding-right : 0',
//    cls	 : 'search-back',
    border: 1,
    defaults: {
        xtype: 'fieldset',
        layout: 'hbox', //,
        margin : '2 0 2 0',
        padding:'0',
        border:0,
    },
    initComponent: function(config) {
    	this.callParent(arguments);
    }

});





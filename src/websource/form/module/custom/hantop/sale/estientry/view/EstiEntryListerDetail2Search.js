Ext.define('module.custom.hantop.sale.estientry.view.EstiEntryListerDetail2Search',{ extend: 'Axt.form.Search',
	alias: 'widget.module-estientry-detail2-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype		: 'fieldset',
				layout		: 'vbox',
				autoScroll	: true,
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	xtype		: 'checkbox',
										fieldLabel	: Language.get('add','전체검색'),
										name		: 'add',
										checked		: false,
										style		: { color : 'blue' },
										margin		: '5 0 0 10',
										listeners	: {
											change	: function(){
												me.selectAction();
											}
										}
									}
								]
							}
						]
					}
				]
			};
		return line;
	},
	selectAction:function(){
		var	me		= this,
			add		= me.down('[name=add]').getValue(),
			master	= Ext.ComponentQuery.query('module-estientry-lister-master')[0],
			detail = Ext.ComponentQuery.query('module-estientry-lister-detail2')[0],
			select	= master.getSelectionModel().getSelection()[0]
			select2	= detail.getSelectionModel().getSelection()[0]
		;

		var mask	= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		if(add==true){
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:detail
			}, Ext.merge({acpt_numb : select.data.invc_numb} ,{ add:add }, { stor_grp : _global.stor_grp }))
		}
		if(add==false){
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:detail
			}, Ext.merge( {acpt_numb : select.data.invc_numb ,  acpt_seqn : record2.get('line_seqn')} , { stor_grp : _global.stor_grp }))
		}
	}
});
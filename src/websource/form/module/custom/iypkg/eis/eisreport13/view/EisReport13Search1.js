Ext.define('module.custom.iypkg.eis.eisreport13.view.EisReport11Search1', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport13-search1',
	height	: 45,
	header	: false,

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'fieldset' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 280 },
			items		: [
				{	xtype : 'fieldset', layout: 'vbox', border : 0,
					items : [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '11 11 5 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
									items		: [
										{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0, margin : '0 0 0 0',
											items		: [
												{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 300',
													items		: [
														{	xtype	: 'radiofield',
															allowBlank: true,
															boxLabel: '금액' ,
															name : 'sub',
															margin : '0 0 -5 0',
															width : 80 ,
															inputValue : '금액',
															value : '금액',
															listeners:{
																change:function(a){
																	if(this.getValue()){
																		me.search(a.inputValue)
																	}
																}
															}
														},{	xtype	: 'radiofield',
															allowBlank: true,
															boxLabel: '수량',
															margin : '0 0 -5 0',
															name : 'sub',
															width : 80 ,
															inputValue : '수량',
															listeners:{
																change:function(a){
																	if(this.getValue()){
																		me.search(a.inputValue)
																	}
																}
															}
														},{	xtype	: 'radiofield',
															allowBlank: true,
															boxLabel: 'm2',
															margin : '0 0 -5 0',
															name : 'sub',
															width : 80 ,
															inputValue : 'm2',
															listeners:{
																change:function(a){
																	if(this.getValue()){
																		me.search(a.inputValue)
																	}
																}
															}
														}
													]
												}
											]
										},
									]
								}
							]
						}
					]
				}
			]
		};
	return item;
	},

	search:function(val){
		var	me = this,
			param1 = me.getValues(),
			lister =  Ext.ComponentQuery.query('module-eisreport13-lister1')[0],
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport13.store.EisReport13Chart1'),
			detail = Ext.ComponentQuery.query('module-eisreport13-detail1')[0],
			record = lister.getSelectionModel().getSelection()[0],
			search = Ext.ComponentQuery.query('module-eisreport13-search')[0],
			param  = search.getValues(), parmaval = val
		;
		if(record){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					}, scope:me
				},Ext.merge( param, { stor_id : _global.stor_id,
							 cstm_idcd : record.get('cstm_idcd'),
							 year : param.year,
							 user_idcd : record.get('user_idcd'),
							 user_name : record.get('user_name'),
							 sub : parmaval}));
			chart1.load({
				params : {
					param:JSON.stringify({
						 cstm_idcd : record.get('cstm_idcd'),
						 user_idcd : record.get('user_idcd'),
						 year : param.year,
						 user_name : record.get('user_name'),
						 sub : parmaval
					})
				},
				callback : function(records,operation,success){
					mask.hide();
				}
			});

		}
	}

});

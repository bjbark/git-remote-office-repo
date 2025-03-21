Ext.define('module.custom.iypkg.eis.eisreport11.view.EisReport11Search2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport11-search2',
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
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 11 5 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 250',
									items		: [
										{	xtype		: 'radiogroup',
											width		: 400,
											name		: 'aa',
											items: [
												{	boxLabel: '거래명세서'	, name: 'amnt', inputValue: '거래명세서', checked: true, margin : '0 0 0 0', width : 110,
													listeners:{
														change:function(a){
															if(this.getValue()){
																me.search(a.inputValue)
															}
														}
													}
												},{	boxLabel: '세금계산서'	, name: 'amnt', inputValue: '세금계산서', margin : '0 0 -5 0', width : 110,
													listeners:{
														change:function(a){
															if(this.getValue()){
																me.search(a.inputValue)
															}
														}
													}
												}
											],
										}
									]
								},
							]
						}
					]
				}
			]
		};
	return item;
	},

	search : function(val){
		var me = this,
			lister = Ext.ComponentQuery.query('module-eisreport11-lister3')[0],
			detail = Ext.ComponentQuery.query('module-eisreport11-detail3')[0],
			chart3 = Ext.getStore('module.custom.iypkg.eis.eisreport11.store.EisReportChart113'),
			record = lister.getSelectionModel().getSelection()[0],
			search = Ext.ComponentQuery.query('module-eisreport11-search')[0],
			param  = search.getValues(),
			paramval = val
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(record){
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			},Ext.merge( param, { stor_id : _global.stor_id
						, cstm_idcd : record.data.cstm_idcd
						, cstm_name : record.data.cstm_name
						, amnt : paramval
						}
					)
			);
			chart3.load({
				params : {
					param:JSON.stringify({
						  cstm_idcd : record.data.cstm_idcd
						, amnt : paramval
						, type : record.data.cstm_name
						, cstm_name : record.data.cstm_name
						, plan_year : param.plan_year
						, find_name : param.find_name
					})
				},
				callback : function(records,operation,success){
				}
			});
		}
		mask.hide();
	}

});

Ext.define('module.custom.iypkg.eis.eisreport14.view.EisReport14WorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-eisreport14-worker-search',
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
			margin		: '2 2 0 2',
			bodyStyle	: { padding: '3px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border : 0,
					items : [
						{	fieldLabel	: '',
							xtype		: 'monthfield',
							name		: 'plan_year',
							fieldCls	: 'requiredindex',
							format		: 'Y'+'년',
							submitFormat: 'Y',
							width		: 100,
							margin		: '5 5 5 40',
							labelWidth	: 50,
							value		: new Date(),
						},{	xtype		: 'radiogroup',
							width		: 400,
							name		: 'radioAcpt',
							margin		: '5 5 5 200',
							items: [
								{	xtype	: 'radiofield',
															allowBlank: true,
															boxLabel: '금액' ,
															name : 'sub',
															margin : '0 0 -5 0',
															width : 80 ,
															inputValue : '금액',
															value : '금액',
															listeners:{
																change:function(myEl){
																	if(this.getValue()){
																		me.search(myEl.inputValue)
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
																change:function(myEl){
																	if(this.getValue()){
																		me.search(myEl.inputValue)
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
																change:function(myEl){
																	if(this.getValue()){
																		me.search(myEl.inputValue)
																	}
																}
															}
														}
							],
						}
					]
				}
			]
		};
	return item;
	},
	search:function(val){
		var	me     = this,
			param = me.getValues(), parmaval = val
			detail = Ext.ComponentQuery.query('module-eisreport14-detail1')[0],
			master = Ext.ComponentQuery.query('module-eisreport14-lister1')[0],
			record = master.getSelectionModel().getSelection()[0],
			plan   = me.down('[name=plan_year]').getValue(),
			chart1 = Ext.getStore('module.custom.iypkg.eis.eisreport14.store.EisReport14Chart1')
		;


//		console.log(Ext.Date.format(plan,'Ymd'));
//		detail.getStore().clearData();
//		detail.getStore().loadData([],false);
//		master.select({
//			callback:function(records, operation, success) {
//				if (success) {
//					master.getSelectionModel().select(0);
//				} else { me.pocket.editor().getForm().reset(true);}
//			}, scope:me
//		}, Ext.merge(  param, { stor_id : _global.stor_id,
//			 sub : parmaval })
//		   );
		if(record){
			master.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			},Ext.merge( param, { stor_id : _global.stor_id,
					cstm_idcd : record.get('cstm_idcd'),
					plan_year : param.plan_year,
					user_idcd : record.get('user_idcd'),
					user_name : record.get('user_name'),
					sub : parmaval
				})
			);

//		chart1.load({
//			params : {
//				param:JSON.stringify({
//					 cstm_idcd : record.get('cstm_idcd'),
//					 user_idcd : record.get('user_idcd'),
//					 user_name : record.get('user_name'),
//					 plan_year : param.plan_year,
//					 sub : parmaval
//				})
//			},
//			callback : function(records,operation,success){
//				mask.hide();
//			}
//		});
		}

	}

});

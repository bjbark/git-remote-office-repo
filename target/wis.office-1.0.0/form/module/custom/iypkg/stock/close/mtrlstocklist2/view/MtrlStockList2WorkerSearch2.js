Ext.define('module.custom.iypkg.stock.close.mtrlstocklist2.view.MtrlStockList2WorkerSearch2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-mtrlstocklist2-worker-search2',
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
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '11 11 5 -20',
							items	: [
								{	fieldLabel	: Language.get('','조회기간'),
									xtype		: 'betweenfield',
									name		: 'invc1_date',
									pair		: 'invc2_date',
									labelWidth	: 99,
									width		: 198,
									margin		: '0 0 0 0',
									root		: true,
									value		: new Date(),
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'invc2_date',
									pair		: 'invc1_date',
									labelWidth	: 15,
									width		: 115,
									value		: new Date(),
								},{	fieldLabel	: Language.get('','거래처'),
									xtype		: 'popupfield',
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									labelWidth	: 99,
									width		: 315,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('','~'),
									xtype		: 'popupfield',
									name		: 'cstm_name2',
									pair		: 'cstm_idcd2',
									labelWidth	: 15,
									width		: 232,
									popup: {
										select : 'SINGLE',
										widget : 'lookup-cstm-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name2'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	name : 'cstm_idcd2', xtype : 'textfield' , hidden : true
								},{	fieldLabel	: Language.get('','합계구분'),
									xtype		: 'lookupfield',
									name		: '',
									lookupValue	: [['1','소계'],['2','일계'],['3','월계'],['4','합계']],
									multiSelect	: true ,
									editable	: false,
									labelWidth	: 99,
									width		: 300,
									margin		: '0 60 0 0',
									value		: ["1","2","3","4"],
								}
							]
						}
					]
				}
			]
		};
	return item;
	},

});

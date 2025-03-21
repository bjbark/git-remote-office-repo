Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-purcbillwork-worker-search',
	height	: 130,
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
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '10 11 5 0',
							items	: [
								{	fieldLabel	: Language.get('acpt_numb','수주번호'),
									xtype		: 'popupfield',
									name		: 'invc_numb',
									labelWidth	: 60,
									width		: 300,
//									editable	: true,
									clearable	: true,
									enableKeyEvents : true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-iypkg-ordr-popup',
										params	: {
											stor_grp	: _global.stor_grp ,
											line_stat	: '0',
											cstm_idcd	: '',
										},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('invc_numb'));
										}
									}
								},{	fieldLabel	: Language.get('invc_date','수주일자'),
									xtype		: 'betweenfield',
									name		: 'invc_date',
									labelWidth	: 70,
									width		: 175,
									margin		: '0 0 0 2',
									root		: true,
									value		: ''
								},{	fieldLabel	: Language.get('acpt_qntt','수주량'),
									xtype		: 'numericfield',
									name		: 'acpt_qntt',
									labelWidth	: 50,
									width		: 135,
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
							items	: [
								{	fieldLabel	: Language.get('prod_name','제품'),
									xtype		: 'popupfield',
									name		: 'prod_name',
									pair		: 'prod_idcd',
									labelWidth	: 60,
									width		: 300,
									clearable	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-prod-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('prod_name'));
											pairField.setValue(records[0].get('prod_idcd'));
										}
									}
								},{	xtype	: 'textfield', name : 'prod_idcd', hidden : true
								},{	fieldLabel	: Language.get('cstm_name','거래처'),
									xtype		: 'popupfield',
									name		: 'cstm_name',
									pair		: 'cstm_idcd',
									labelWidth	: 70,
									width		: 310,
									margin		: '0 0 0 2',
									clearable	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-cstm-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
										}
									}
								},{	xtype	: 'textfield', name : 'cstm_idcd', hidden : true
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
							items	: [
								{	fieldLabel	: Language.get('','규격'),
									   xtype		: 'numericfield',
									   name		: 'item_leng',
									   margin		: '-1 0 0 0',
									   labelWidth	: 60,
									   width		: 140,
								},{	xtype		: 'numericfield',
									   name		: 'item_widh',
									   margin		: '0 0 0 5',
									   width		: 75,
								},{	xtype		: 'numericfield',
									   name		: 'item_hght',
									   margin		: '0 0 0 5',
									   width		: 75,
								},{	fieldLabel	: Language.get('','P/O No'),
									   xtype		: 'textfield',
									   name		: 'pcod_numb',
									   margin		: '-1 0 0 12',
									   labelWidth	: 60,
									   width		: 300
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0', fieldDefaults: { width : 561, labelWidth : 70 },
							items	: [
								{	fieldLabel	: Language.get('','입고일자'),
									xtype		: 'betweenfield',
									name		: 'fr_invc_date',
									pair		: 'to_invc_date',
									labelWidth	: 60,
									width		: 175,
									margin		: '0 0 0 0',
									root		: true,
									value		: Ext.Date.getFirstDateOfMonth(new Date())
								},{	xtype		: 'betweenfield',
									fieldLabel	:'~',
									name		: 'to_invc_date',
									pair		: 'fr_invc_date',
									labelWidth	: 15,
									width		: 125,
									value		: new Date()
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

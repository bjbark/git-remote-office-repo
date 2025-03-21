Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerLister2Search2', { extend: 'Axt.form.Search',

	alias	: 'widget.module-purcbillwork-worker-lister2-search',
	height	: 75,
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
			bodyStyle	: { padding: '5px', border : 0},
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 50',
					items	: [
						{	fieldLabel	: Language.get('txbl_path_dvcd','계산서 구분'),
							xtype		: 'lookupfield',
							enableKeyEvents	: true,
							editable	: false,
							name		: 'txbl_path_dvcd',
							labelWidth	: 55,
							width		: 255,
							margin		: '10 0 0 0',
							multiSelect	: true ,
							lookupValue	: [['11','원단'],['14','부자재'],['12','상품'],['13','기타'],['15','외주']],
							value		: ["11","14","12","13","15"]
						},{	fieldLabel	: Language.get('cstm_name','거래처'),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							labelWidth	: 45,
							width		: 235,
							margin		: '10 0 0 0',
							clearable	: true,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	xtype	: 'textfield', name : 'cstm_idcd', hidden : true
						}
					]
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '-5 0 0 50',
					items	: [
						{	fieldLabel	: Language.get('','발행일자'),
							xtype		: 'betweenfield',
							name		: 'invc1_date',
							pair		: 'invc2_date',
							labelWidth	: 55,
							width		: 150,
							margin		: '10 0 0 0',
							root		: true,
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
						},{	xtype		: 'betweenfield',
							fieldLabel	:'~',
							name		: 'invc2_date',
							pair		: 'invc1_date',
							labelWidth	: 10,
							width		: 105,
							margin		: '10 0 0 0',
							value		: new Date(),
						},{	fieldLabel	: Language.get('prod_name','제품'),
							xtype		: 'popupfield',
							name		: 'prod_name',
							pair		: 'prod_idcd',
							labelWidth	: 45,
							width		: 235,
							margin		: '10 0 0 -0',
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
						}
					]
				},{	xtype		: 'textfield',
					name		: 'change',
					hidden		: true
				}
			]
		};
	return item;
	},

});

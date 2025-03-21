Ext.define('module.custom.iypkg.etc.trsfwork.view.TrsfWork2WorkerEditor', { extend: 'Axt.form.Search',

	alias	: 'widget.module-trsfwork-worker-editor',
	height	: 70,
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
				flex		: 100 ,
				fieldDefaults: { width : 350, labelWidth : 50, margin : '0 0 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'vbox', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '4 3 3 0',
								items : [
									{	fieldLabel	: Language.get('qntt','출고량'),
										xtype		: 'numericfield',
										name		: 'sum_qntt',
										fieldCls	: 'requiredindex',
										readOnly	: true,
										width		: 130,
									},{	fieldLabel	: Language.get('','총m2'),
										xtype		: 'numericfield',
										name		: 'sum_m2',
										width		: 130,
										fieldCls	: 'requiredindex',
										readOnly	: true,
									},{	fieldLabel	: Language.get('qntt','운송수량'),
										xtype		: 'numericfield',
										name		: 'qntt',
										width		: 170,
										labelWidth	: 65,
										fieldCls	: 'requiredindex',
										readOnly	: true,
									},{	fieldLabel	: Language.get('trnt_exps','운송금액'),
										xtype		: 'numericfield',
										name		: 'trnt_exps',
										labelWidth	: 65,
										width		: 170,
										fieldCls	: 'requiredindex',
										readOnly	: true,
									},{	fieldLabel	: Language.get('invc_date','운송일자'),
										xtype		: 'datefield',
										name		: 'invc_date',
										width		: 168,
										labelWidth	: 65,
										format		: Const.DATE_FORMAT_YMD_BAR,
										submitFormat: Const.DATE_FORMAT_YMD,
										clearable	: true
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '2 3 3 0',
								items : [
									{	fieldLabel	: Language.get('cars_alis','운송차량'),
										xtype		: 'popupfield',
										name		: 'cars_alis',
										pair		: 'cars_idcd',
										clearable	: true,
										width		: 260,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-car-popup',
											params : { stor_grp : _global.stor_grp},
											result : function(records, nameField, pairField) {
												nameField.setValue(records[0].get('cars_alis'));
												pairField.setValue(records[0].get('cars_idcd'));
//												me.down('[name=crrr_name]').setValue(records[0].get('nwek_name'));
											}
										}
									},{	name : 'cars_idcd', xtype : 'textfield' , hidden : true
									},{	fieldLabel	: Language.get('nwek_name','운송자'),
										xtype		: 'textfield',
										name		: 'nwek_name',
										clearable	: true,
										width		: 170,
										labelWidth	: 65,
									},{	fieldLabel	: Language.get('need_time','소요시간'),
										name		: 'need_time',
										xtype		: 'numericfield',
										labelWidth	: 65,
										width		: 170,
									},{	fieldLabel	: Language.get('runn_dist','운행거리'),
										xtype		: 'numericfield',
										name		: 'runn_dist',
										clearable	: true,
										margin		: '0 0 0 0',
										labelWidth	: 65,
										width		: 170,
									}
								]
							}
						]
					}
				]
			};
		return item;
	}
});

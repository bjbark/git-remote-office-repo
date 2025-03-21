Ext.define('module.custom.iypkg.mtrl.po.purcordr2.view.PurcOrdr2WorkerSearch', { extend: 'Axt.form.Search',

	alias	: 'widget.module-purcordr2-worker-search',
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
				flex		: 100 ,
				margin		: '0 0 0 0',
				fieldDefaults: { width : 280, labelWidth : 55 , margin : '5 5 0 0'},
				items		: [
					{	xtype : 'fieldset', layout: 'hbox', border : 0, margin : '5 5 0 0',
						items : [
							{	fieldLabel	: Language.get('cstm_name','발주처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true,
								width		: 212,
								labelWidth	: 45,
								margin		: '5 0 0 -10',
								name		: 'cstm_name',
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								pair		: 'cstm_idcd',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', puch_cstm_yorn : '1'},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,
							listeners : {
								change : function(){
									var lister = Ext.ComponentQuery.query('module-purcordr2-worker-lister')[0],
										store  = lister.getStore()
									;

									for (var i = 0; i < store.data.length; i++) {
										Ext.Ajax.request({
											url			: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr2/get/pric.do',
											params		: {
												token	: _global.token_id ,
												param	: JSON.stringify({
													stor_id		: _global.stor_id,
													asmt_idcd	: store.data.items[i].data.asmt_idcd,
													cstm_idcd	: this.value
												})
											},
											async	: false,
											method	: 'POST',
											success	: function(response, request) {
												var result = Ext.decode(response.responseText)
												;
												store.getAt(i).set('offr_pric',result.records[0].pric);
											}
										});
									}
								}
							}
						},{	fieldLabel	: Language.get('offr_date', '발주일자' ),
							name		: 'offr_date',
							xtype		: 'datefield',
							labelWidth	: 85,
							width		: 180,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('deli_date', '납기일자' ),
							name		: 'deli_date',
							xtype		: 'datefield',
							labelWidth	: 80,
							width		: 175,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.add( new Date(), Ext.Date.DAY, +0),
						},{	fieldLabel	: Language.get('drtr_name', '발주 담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true,
							width		: 220,
							labelWidth	: 95,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name	: 'drtr_idcd', xtype	: 'textfield', hidden : true
						}
					]
					},
				]
			};
		return item;
	}
});

Ext.define('module.custom.iypkg.sale.sale.rqstwork.view.RqstWorkWorkerEditor', { extend: 'Axt.form.Editor',
	border	: false,
	alias	: 'widget.module-rqstwork-worker-editor',
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.iypkg.sale.sale.rqstwork.store.RqstWorkInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.callParent(arguments);
	},

	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 3 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox', border		: 0,
					items : [
						{	fieldLabel	: Language.get('ostt_date','출고일자'),
							xtype		: 'betweenfield',
							name		: 'ostt_date1',
							pair		: 'ostt_date2',
							clearable	: true,
							width		: 146,
							labelWidth	: 50,
							root		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: Ext.Date.getFirstDateOfMonth(new Date()),
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'betweenfield',
							name		: 'ostt_date2',
							pair		: 'ostt_date1',
							clearable	: true,
							width		: 101,
							labelWidth	: 5,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date(),
						},{	fieldLabel	: Language.get('cstm_name','거래처'),
							xtype		: 'popupfield',
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							width		: 212,
							popup: {
								select : 'SINGLE',
								widget : 'lookup-cstm-popup',
								params : { stor_grp : _global.stor_grp , line_stat : '0' },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
									me.down('[name=cstm_code]').setValue(records[0].get('cstm_code'));
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
						},{	name : 'cstm_code', xtype : 'textfield' , hidden : true
						},{	text		: '<span class="btnTemp" style="font-size:1.3em">청구대기 자료 가져오기</span>',
							xtype		: 'button',
							width		: 160,
							height		: 25,
							margin		: '3 0 0 45',
							cls			: 'button-style',
							action		: 'selectAction2'
						}
					]
				}
			]
		};
		return item;
	}
});

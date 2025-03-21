Ext.define('module.custom.kortc.prod.rsvdorder.view.RsvdOrderWorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-rsvdorder-worker-editor',
	height	: 170,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.kortc.prod.rsvdorder.store.RsvdOrderInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px'},
			flex		: 100 ,
			fieldDefaults: { width : 330, labelWidth : 70 },
			items		: [
				{	xtype : 'fieldset', layout : 'hbox', padding: '0', border: 0 ,
					items : [
						{	fieldLabel	: Language.get('acpt_numb', '오더번호' ),
							xtype		: 'textfield',
							name		: 'invc_numb',
							width		: 280,
							readOnly	: true,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
	//						margin		: '0 0 0 0'
						},{	xtype		: 'textfield',
							name		: '',
							labelWidth	: 45,
							width		: 45,
							margin		: '1 0 0 5',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							root		: true,
						}
					]
				},{	xtype : 'fieldset', layout : 'hbox', padding: '0', border: 0 ,
					items : [
						{	fieldLabel	: Language.get('cstm_name', '거래처' ),
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								clearable	: true ,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('cstm_name'));
											pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true
						}
					]
				},{	xtype : 'fieldset', layout : 'hbox', padding: '0', border: 0 ,
					items : [
						{	fieldLabel	: Language.get('wrhs_name', '창고' ),
							name		: 'wrhs_name',
							pair		: 'wrhs_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							clearable	: true ,
							popup		: {
								widget	: 'lookup-wrhs-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('wrhs_name'));
										pairField.setValue(records[0].get('wrhs_idcd'));
								}
							},
							listeners	: {
								change	: function(){
									var val = this.getValue()
										name = Ext.ComponentQuery.query('module-rsvdorder-worker-lister')[0]
									;
									if(val=='' || val==null){
										console.log(name, "<<<<<< name");
									}
								}
							}
						},{	name : 'wrhs_idcd', xtype	: 'textfield', hidden : true
						}
					]
				},{	xtype : 'fieldset', layout : 'hbox', padding: '0', border: 0 ,
					items : [
						{	fieldLabel	: Language.get('drtr_name', '담당자' ),
							name		: 'drtr_name',
							pair		: 'drtr_idcd',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
	//						fieldCls	: 'requiredindex',
							allowBlank	: false,
	//						emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							popup		: {
								widget	: 'lookup-user-popup',
								select	: 'SINGLE',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name : 'drtr_idcd', xtype	: 'textfield', hidden : true
						},{	name : 'chk', xtype	: 'textfield', hidden : true
						}
					]
				},{ xtype : 'fieldset', layout : 'hbox', padding: '0', border: 0 ,
					items : [
						{	fieldLabel	: Language.get('invc_date','오더일자'),
							xtype		: 'datefield',
							name		: 'invc_date',
							width		: 165,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('deli_date','납기일자'),
							xtype		: 'datefield',
							name		: 'deli_date',
							width		: 165,
							value		: new Date(),
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				}
			]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},


	/**
	 *
	 */
	createTab1 : function() {
		var item = {
			title 			: '메모사항',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 50, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{	xtype		: 'textarea',
							name		: 'user_memo',
							height		: 115,
							width		: 805,
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.'
						}
					]
				}
			]
		}
	;
	return item;
	}
});

Ext.define('module.custom.sjflv.sale.order.estimast2.view.EstiMast2WorkerEditor', { extend: 'Axt.form.Editor',

	alias	: 'widget.module-estimast2-worker-editor',
	height	: 180,
	header	: false,
	getStore: function() {
		return Ext.getStore( 'module.custom.sjflv.sale.order.estimast2.store.EstiMast2Invoice' );
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
			bodyStyle	: { padding: '5px' },
			flex		: 100 ,
			fieldDefaults: { width : 280, labelWidth : 70 },
			items		: [
				{	fieldLabel	: Language.get('acpt_numb', '견적번호' ),
					xtype		: 'textfield',
					name		: 'invc_numb',
					fieldCls	: 'requiredindex',
					margin		: '5 5 5 0'
				},{	fieldLabel	: Language.get('new_ordr', '신규' ),
					xtype		: 'textfield',
					name		: 'new_ordr',
					margin		: '5 5 5 0',
					hisdden		: true,
				},{	fieldLabel	: Language.get('cstm_code', '거래처코드' ),
					name		: 'cstm_code',
					pair		: 'cstm_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					clearable	: true ,
					popup		: {
						widget	: 'lookup-cstm-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn : '1' },
						result	: function(records, nameField, pairField ) {
							var panel1 = nameField.up('form');
							nameField.setValue(records[0].get('cstm_code'));
							pairField.setValue(records[0].get('cstm_idcd'));
							panel1.down('[name=cstm_name]').setValue(records[0].get('cstm_name'));
							panel1.down('[name=drtr_idcd]').setValue(records[0].get('sale_drtr_idcd'));
							panel1.down('[name=drtr_name]').setValue(records[0].get('sale_drtr_name'));

							var searchForm = Ext.ComponentQuery.query('module-estimast2-worker-search')[0];
							searchForm.down('[name=item_code]').popup.params.cstm_idcd = records[0].get('cstm_idcd');
						}
					}
				},{	name : 'cstm_idcd', xtype	: 'textfield', hidden : true,
					listeners	: {
						change	: function(){
							var searchForm = Ext.ComponentQuery.query('module-estimast2-worker-editor')[0];

							searchForm = Ext.ComponentQuery.query('module-estimast2-worker-search')[0];
							searchForm.down('[name=item_code]').popup.params.cstm_idcd = this.getValue();
						}
					},
				},{	fieldLabel	: Language.get('cstm_name', '거래처명' ),
					name		: 'cstm_name',
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					allowBlank	: false,
					emptyText	: Const.invalid.emptyValue,
					clearable	: false ,
				},{	fieldLabel	: Language.get('sale_drtr_name', '영업담당자' ),
					name		: 'drtr_name',
					pair		: 'drtr_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					clearable	: true ,
					allowBlank	: false,
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
				},{	fieldLabel	: Language.get('esti_date', '견적일자' ),
					name		: 'invc_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					fieldCls	: 'requiredindex',
					allowBlank	: false,
				},{	fieldLabel	: Language.get('esti_date', '납기일자' ),
					name		: 'deli_date',
					xtype		: 'datefield',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD
				},{	name : 'modi_yorn', xtype	: 'textfield', hidden : true, value : 'n'
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
							name		: 'memo',
							height		: 118,
							width		: 690,
							maxLength	: 100,
							maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
							value		: '최소발주량 10kg'
						}
					]
				}
			]
		}
	;
	return item;
	}
});

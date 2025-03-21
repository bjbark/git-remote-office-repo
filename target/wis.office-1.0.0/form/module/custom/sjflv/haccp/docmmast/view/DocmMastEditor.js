Ext.define('module.custom.sjflv.haccp.docmmast.view.DocmMastEditor', { extend: 'Axt.form.Editor',
	alias: 'widget.module-sjflv-docmmast-editor',
	
	getStore : function() {
		return Ext.getStore( 'module.custom.sjflv.haccp.docmmast.store.DocmMastInvoiceStore' );
	},
	
	initComponent: function(config){
		var me = this;
		me.dockedItems = [me.createTop()];
		me.callParent(arguments);
	},

	createTop: function() {
		var me	= this,
			item = {
				xtype		: 'form-panel',
				dock		: 'top',
				border		: 0,
				bodyStyle	: {
					padding: '5px'
				},
				//fieldDefaults: { width : 320, labelWidth : 60, labelSeparator : '' },
				items		: [
					{	xtype	: 'fieldcontainer',
						layout	: 'hbox',
						items	: [
							{	xtype		: 'textfield',
								name		: 'mngt_numb',
								fieldLabel	: Language.get('', '관리번호'),
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								margin		: '1 0 0 0',
								width		: 70,
								editable	: false,
								lookupValue	: resource.lookup('dele_yorn'),
								value		: '0'
							},{	xtype		: 'popupfield',
								name		: 'bzpl_name',
								pair		: 'bzpl_idcd',
								fieldLabel	: Language.get('', '분류기준'),
								editable	: true,
								enableKeyEvents : true,
								emptyText	: '',
								clearable	: false,
								popup		: {
									widget	: 'lookup-bzpl-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
											nameField.setValue(records[0].get('bzpl_name'));
											pairField.setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	xtype	: 'textfield',
								name	: 'bzpl_idcd',
								hidden	: true
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: 'hbox',
						items	: [
							{	xtype		: 'textfield',
								name		: 'docm_name',
								width		: 285,
								fieldLabel	: Language.get('', '문서명'),
							},{	xtype		: 'textfield',
								name		: 'docm_numb',
								fieldLabel	: Language.get('', '문서번호'),
							},{	xtype		: 'lookupfield',
								name		: '',
								fieldLabel	: Language.get('', '작성주기'),
								margin		: '1 0 0 0',
								width		: 180,
								editable	: false,
								lookupValue	: resource.lookup('dwup_ccle_dvcd'),
							}
						]
					},{	xtype	: 'fieldcontainer',
						layout	: 'hbox',
						items	: [
							{	xtype		: 'filefield',
								name		: 'files',
								fieldLabel	: '첨부파일',
								anchor		: '100%',
								width		: 274,
								buttonText	: '찾아보기',
							},{	xtype:'hiddenfield',
								name:'param',
								value:''
							},{	xtype:'hiddenfield',
								name:'token',
								value:_global.token_id
							}
						]
					}
				]
			};
		return item;
	},
});
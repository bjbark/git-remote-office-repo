Ext.define('module.stock.lot.lottracking.view.LotTrackingEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-lottracking-editor',

	layout : {
		type: 'border'
	},

	title			: Language.get('LOT','LOT 정보'),
	defaultFocus	: 'lott_numb',

	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
				    {	layout		: 'hbox',
				    	border		: 0,
				    	margin		: '0 0 5 0',
				    	items		: [
				    		{	fieldLabel	: Language.get( 'lott_numb' , 'Lot번호'),
								xtype		: 'popupfield',
								editable 	: true,
								enableKeyEvents : true,
								name		: 'lott_numb',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								clearable	: true ,
								onwerEditing: true,
								width		: 240,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-lott-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0'},
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('lott_numb'));
										me.down('[name=acct_name]').setValue(records[0].get('acct_name'));
										me.down('[name=item_code]').setValue(records[0].get('item_code'));
										me.down('[name=item_name]').setValue(records[0].get('item_name'));
										me.down('[name=item_spec]').setValue(records[0].get('item_spec'));
										me.down('[name=stok_qntt]').setValue(records[0].get('stok_qntt'));
										me.down('[name=acct_bacd]').setValue(records[0].get('acct_bacd'));
										me.down('[name=lott_numb2]').setValue(records[0].get('lott_numb'));
									}
								},
								listeners:{
									change : function(){
										var value = this.getValue();
										if(value == ""){
											me.down('[name=acct_name]').setValue('');
											me.down('[name=item_code]').setValue('');
											me.down('[name=item_name]').setValue('');
											me.down('[name=item_spec]').setValue('');
											me.down('[name=stok_qntt]').setValue('');
											me.down('[name=acct_bacd]').setValue('');
											me.down('[name=lott_numb2]').setValue('');
										}
									}
								}
							},{	xtype	: 'checkbox',
								fieldLabel	: Language.get( '' , '공개여부'),
								labelWidth	: 50,
								name		: 'open_yorn',
								listeners: {
						            change: function(checkbox, newValue, oldValue, eOpts) {
						            	if(newValue){
						            		me.down('[name=item_name]').show();
						            		me.down('[name=item_spec]').show();
						            	}else{
						            		me.down('[name=item_name]').hide();
						            		me.down('[name=item_spec]').hide();
						            	}
									}
								}
				    		}
				    	]

				    },{	fieldLabel	: Language.get('acct_name','품목구분'),
						xtype		: 'textfield',
						name		: 'acct_name',
						readOnly	: true,
						fieldCls	: 'readonlyfield'
					},{	fieldLabel	: Language.get('item_code','품목코드'),
						xtype		: 'textfield',
						name		: 'item_code',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
					},{	fieldLabel	: Language.get('item_name','품명'),
						xtype		: 'textfield',
						name		: 'item_name',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						hidden		: true,
					},{	fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						hidden		: true,
					},{	fieldLabel	: Language.get('stok_qntt','재고수량'),
						xtype		: 'numericfield',
						name		: 'stok_qntt',
						readOnly	: true,
						fieldCls	: 'readonlyfield'
					},{	xtype		: 'textfield',
						name		: 'acct_bacd',
						hidden		: true
					},{	xtype		: 'textfield',
						name		: 'lott_numb2',
						hidden		: true
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ {xtype : 'module-lottracking-isos-lister', title : Language.get('','수불내역')}]
			}
		;
		return item;
	},

});
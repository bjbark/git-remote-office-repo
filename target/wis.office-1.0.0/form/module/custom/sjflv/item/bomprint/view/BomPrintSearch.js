Ext.define('module.custom.sjflv.item.bomprint.view.BomPrintSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-sjflv-bomprint-search',
	 initComponent: function(){
		var me = this;
		me.items = [me.searchBasic() ,me.createLine1()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height	: 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset'
						,border	: 3
						,flex	: 1
						,style	: { borderColor	: '#263c63', borderStyle	: 'solid' }
						,region	: 'center'
						,height	: 34
						,margin : '3 0 0 0'
						,defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
						,layout	: 'hbox'
						,items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'     ,
								xtype	: 'searchfield',
								flex	: 4,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	},
	createLine1 : function(){
		var me = this,
			line = {
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				collapsible	: true,
				collapsed	: true,
				fieldDefaults	: { labelWidth : 100 },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('item','품목코드'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'item_code',
								pair		: 'item_idcd',
								clearable	: true,
								width		: 250,
								margin		: 0,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-item-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('~','~'),
								xtype		: 'popupfield', editable : true, enableKeyEvents : true,
								name		: 'item_code2',
								pair		: 'item_idcd2',
								clearable	: true,
								width		: 160,
								labelWidth	: 10,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-item-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' },
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name		: 'item_idcd2', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('','품목군'),
								xtype		: 'popupfield',
								name		: 'item_clss_bacd_name',
								pair		: 'item_clss_bacd',
								width		: 300,
								hidden		: _global.hq_id !='N1000nbolt',
								clearable	: true,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-base-popup',
									params  : { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '8001'},
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name	: 'item_clss_bacd'		, xtype : 'textfield', hidden : true
							},{	fieldLabel	: Language.get('acpt_date','등록기간'),
								xtype		: 'betweenfield',
								name		: 'invc1_date',
								pair		: 'invc2_date',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 2',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'invc2_date',
								pair		: 'invc1_date',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	name		: 'acct_code', xtype : 'textfield' , hidden : true, value		: '3000',
							},{	xtype		: 'checkbox',
								name		: 'add',
								checked		: false,
								style		: { color : 'blue' },
								margin		: '0 0 0 30',
								listeners	:{
									change:function(){
										var	lister1 = Ext.ComponentQuery.query('module-sjflv-bomprint-lister1')[0],
											lister2 = Ext.ComponentQuery.query('module-sjflv-bomprint-lister2')[0],
											lister3 = Ext.ComponentQuery.query('module-sjflv-bomprint-lister3')[0],
											record  = lister1.getSelectionModel().getSelection()[0]
										;

										lister3.getStore().clearData();
										lister3.getStore().removeAll();

										if(record){
											resource.mask.show({msg: Const.SELECT.mask });
											lister2.select({
												callback:function(records, operation, success) {
													resource.mask.hide();
												}, scope:me
											},Ext.merge( me.getValues(), {
												hq_id		: _global.hq_id,
												prnt_item_idcd	: record.get('item_idcd') ,
											}));
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '품목분류'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 410,
								name		: 'clss_desc',
								pair		: '',
								margin		: '0 5 0 0',
								clearable	: true ,
								hidden		: (_global.hq_id.toUpperCase()=='N1000NBOLT'),
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-clss-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('clss_desc'));
										me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
										me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
										me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									}
								},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if( val == '' || val == null ){
											me.down('[name=lcls_idcd]').reset();
											me.down('[name=mcls_idcd]').reset();
											me.down('[name=scls_idcd]').reset();
										}
									}
								}
							},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '거래처'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 250,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								margin		: '0 5 0 0',
								clearable	: true ,
								hidden		: (_global.hq_id.toUpperCase()=='N1000NBOLT'),
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								},
							},{	name		: 'cstm_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},
				]
			};
		return line;
	}
});
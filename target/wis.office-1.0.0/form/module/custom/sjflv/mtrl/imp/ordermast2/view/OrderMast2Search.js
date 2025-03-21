Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-ordermast2-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
//			me.createLine1(),
			me.addonSearch()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !impant;font-weight:bold;',
							},{	name	: 'find_name',
								xtype		: 'searchfield',
								flex		: 4,
								emptyText	: '',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				//collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('bzpl_name','사업장'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'bzpl_name',
								pair		: 'bzpl_idcd',
								width		: 250,
								labelWidth	: 100,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-bzpl-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bzpl_name'));
										pairField.setValue(records[0].get('bzpl_idcd'));
									}
								}
							},{	name : 'bzpl_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('ordr_numb','Order No'),
								xtype		: 'textfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'invc_numb',
								width		: 250,
								labelWidth	: 100,
								clearable	: true,
								/*popup: {
									select : 'SINGLE',
									widget : 'lookup--popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
									}
								}*/
							},{	fieldLabel	: Language.get('','Order Date'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 200,
								labelWidth	: 100,
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date())
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 115,
								labelWidth	: 15,
								value		: new Date()
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('incm_dvcd','수입구분'),
								xtype		: 'lookupfield',
								name		: 'incm_dvcd',
								lookupValue	: resource.lookup('incm_dvcd'),
								width		: 250,
								labelWidth	: 100,
							},{	fieldLabel	: Language.get('','Supplier'),
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 250,
								labelWidth	: 100,
								clearable	: true,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0',puch_cstm_yorn:1 },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
										setTimeout(function(){
											me.down('[name=mdtn_name]').focus(true,10);
										}, 50)
									}
								}
							},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true,
								listeners:{
									change:function(){
										me.down('[name=mdtn_name]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0' ,cstm_idcd:this.getValue() };
									}
								}
							},{	fieldLabel	: Language.get('','Forwarder'),
								xtype		: 'popupfield',
								name		: 'mdtn_name',
								pair		: 'mdtn_prsn',
								width		: 250,
								labelWidth	: 100,
								clearable	: true,
								popup		: {
									widget	: 'lookup-cstm-deli-popup',
									select	: 'SINGLE',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField ) {
										nameField.setValue(records[0].get('dlvy_drtr_name'));
										pairField.setValue(records[0].get('dlvy_cstm_idcd'));
										setTimeout(function(){
											me.down('[name=drtr_name]').focus(true,10);
										}, 50)
									},
									create : function (self ) {
										editor = Ext.ComponentQuery.query('module-ordermast2-search')[0];
										param = editor.getValues()
										if(param.cstm_idcd== '' || param.cstm_idcd == null ){
											Ext.Msg.alert("알림","Supplier를 먼저 선택하여 주십시오.");
											popup.close();
											return;
										}
									}
								},
							},{	name	: 'mdtn_prsn', xtype	: 'textfield', hidden : true
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('drtr_name','담당자'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								width		: 250,
								labelWidth	: 100,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-user-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','진행상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								lookupValue	: resource.getList('search_all').concat(resource.lookup('line_clos')),
								width		: 200,
								labelWidth	: 100,
								value		: '0'
							}
						]
					}
				]
			};
		return line;
	}
});
Ext.define('module.membership.inout.inotlist.view.InotListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-inotlist-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
		me.callParent();
	},
	searchBasic : function(){
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
					{	xtype		: 'fieldset',
						border		: 3,
						flex		: 1,
						style		: { borderColor	: '#000081', borderStyle	: 'solid' },
						region		: 'center',
						height		: 34,
						margin 	: '3 0 0 0',
						defaults 	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout		: 'hbox',
						items		:[
							{	xtype	: 'label',
								fieldCls: 'requiredindex',
								text	: 'SEARCH  | ',
								margin	: '5 10 0 0',
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText		: '조회할 회원코드 또는 회원명 , 전화번호를 입력하세요...',
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
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
			};
		return line;
	},

	createLine1 : function(){
		var me = this,
			line = {
				xtype		: 'fieldset'	,
				title		: '상세검색',
				layout		: 'vbox',
				collapsible : true	,
				collapsed	: false	,
				fieldDefaults	: { labelWidth : 100 },
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
						items	: [
							{	fieldLabel	: '담당코치',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								allowBlank	: true,
								clearable	: false ,
								width		: 160,
								labelWidth	: 60,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('mmbr_name','회원명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mmbr_name',
								pair		: 'mmbr_idcd',
								clearable	: true,
								width		: 160,
								labelWidth	: 60,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-member-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mmbr_name'));
										pairField.setValue(records[0].get('mmbr_idcd'));
										me.down('[name=mmbr_idcd]').setValue(records[0].get('mmbr_idcd'));
										me.down('[name=mmbr_name]').setValue(records[0].get('mmbr_name'));
									}
								}
							},{	name		: 'mmbr_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('hdph_numb','전화번호'),
								name		: 'hdph_numb',
								xtype		: 'searchfield',
								width		: 160,
								labelWidth	: 60,
								emptyText	: '전화번호를 입력하세요...',
								enableKeyEvents : true,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //엔터or탭으로 조회
										}
									},
								}
							},{	fieldLabel	: Language.get('proc_date','레슨일자'),
								xtype		: 'betweenfield',
								name		: 'proc_fr_dt',
								pair		: 'proc_to_dt',
								labelWidth	: 60,
								width		: 160,
								root		: true,
								value		: new Date()
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'proc_to_dt',
								pair		: 'proc_fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: new Date()
							}
						]
					}
				]
			};
		return line;
	}

});
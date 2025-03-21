Ext.define('module.prod.wmold.wmoldlist.view.WmoldListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-wmoldlist-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic() ,me.createLine1()];
		me.callParent();
	},
	searchBasic : function()
	{
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
								emptyText	: Language.get('acpt_numb', '목형코드'   )+' 또는 '+Language.get('acpt_case_name', '목형명')+'을 입력하세요....',
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
				xtype		: 'fieldset',
				title		: '상세검색',
				layout		: 'vbox',
				collapsible	: true	,
				collapsed	: true	,
				fieldDefaults	: { labelWidth : 70 },
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('acpt_numb', '목형코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mold_name',
								pair		: 'mold_idcd',
								clearable	: true ,
								width		: 300,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wmold-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mold_name'));
										pairField.setValue(records[0].get('mold_idcd'));
									}
								}
							},{	name		: 'mold_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('updt_expc_date','점검일자'),
								xtype		: 'betweenfield',
								name		: 'updt_expc_date1',
								pair		: 'updt_expc_date2',
								width		: 170,
								root		: true,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'updt_expc_date2',
								pair		: 'updt_expc_date1',
								labelWidth	: 15,
								width		: 115,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('numb_shot','잔여Shot'),
								xtype		: 'numericfield',
								width		: 170,
								name		: 'numb_shot',
							},{	fieldLabel	: Language.get('','이하'),
								xtype		: 'textfield',
								labelWidth	: 30,
								width		: 15,
								margin		: '0 15 0 0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
						items	: [
							{	fieldLabel	: '관리부서'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 300,
								name		: 'dept_name',
								pair		: 'dept_idcd',
								clearable	: true ,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-dept-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_idcd'));
									}
								}
							},{ name		: 'dept_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('puch_date','구매일자'),
								xtype		: 'betweenfield',
								name		: 'from_date',
								pair		: 'to_date',
								width		: 170,
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	: '~',
								name		: 'to_date',
								pair		: 'from_date',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 170,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: '0'
							}
						]
					}
				]
			};
		return line;
	}

});
Ext.define('module.prod.mold.moldshot.view.MoldShotSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-moldshot-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
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
								emptyText	: Language.get('acpt_numb', '금형코드'	)+' 또는 '+Language.get('acpt_case_name', '금형명')+'을 입력하세요....',
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
				xtype : 'fieldset'	,
				title : '상세검색',
				layout: 'vbox',
				collapsible : true	,
				collapsed	: true	,
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
						items	: [
							{	name : 'mold_code', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('repa_date','작업일자'),
								xtype		: 'betweenfield',
								name		: 'chek1_date',
								pair		: 'chek2_date',
								width		: 195,
								labelWidth	: 100,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'chek2_date',
								pair		: 'chek1_date',
								width		: 115,
								labelWidth : 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: ''
							},{	fieldLabel	: Language.get('acpt_numb', '금형코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mold_name',
								pair		: 'mold_idcd',
								clearable	: true ,
								width		: 285,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-mold-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mold_name'));
										pairField.setValue(records[0].get('mold_idcd'));
									}
								}
							},{	name		: 'mold_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_stat','상태'),
								xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 170,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_stat' )),
								value		: '0'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '2 0 0 0',
						items	: [
							{	fieldLabel	: '관리부서'	,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 310,
								labelWidth	: 100,
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
								name		: 'chek_date3',
								pair		: 'chek_date4',
								width		: 170,
								root		: true,
								value		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	xtype		: 'betweenfield',
								fieldLabel	: Language.get('','~'),
								name		: 'chek_date4',
								pair		: 'chek_date3',
								labelWidth	: 15,
								width		: 115,
								value		: '',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							}
						]
					}
				]
			};
			return line;
		}
});
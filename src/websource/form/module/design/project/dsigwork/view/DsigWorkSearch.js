Ext.define('module.design.project.dsigwork.view.DsigWorkSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-dsigwork-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
//		me.items = [ me.searchBasic()];
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
							},{	fieldLabel	: Language.get('acpt_numb','금형코드'),
									xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'pjod_idcd',
									width		: 250,
									clearable	: true,
									emptyText	:'조회할 '+Language.get('acpt_case_name', '금형명') +'을 입력하세요',
									popup: {
										select : 'SINGLE',
										widget : 'lookup-pjod-popup',
										params : { stor_grp : _global.stor_grp , line_stat : '0' },
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('pjod_idcd'));
										}
									}
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText	: Language.get('acpt_numb', '금형코드'	)+' 또는 '+Language.get('acpt_case_name', '금형명')+'을 입력하세요.',
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
				layout: 'vbox',
				collapsed	: false	,
				items : [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 10',
						items	: [
							{	fieldLabel	: Language.get('work_date','작업일자'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								width		: 180,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								width		: 130,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD
							}
	 					]
					}
				]
			};
		return line;
	}
});
Ext.define('module.sale.project.prjttestordr.view.PrjtTestOrdrSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prjttestordr-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(), me.createLine1()];
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
							},{	fieldLabel	: Language.get('work_ordr_dvcd','구분'),
								xtype		: 'lookupfield',
								name		: 'work_ordr_dvcd',
								lookupValue	: resource.lookup('work_ordr_dvcd'),
								width		: 120,
								labelWidth	: 30,
								value		: '1100',
								listeners	: {
									render:function(com,val,a,b,c){
										me.down('[name=pjod_idcd]').popup.params.work_ordr_dvcd = com.value;
									},
									change:function(com,val){
										me.down('[name=pjod_idcd]').popup.params.work_ordr_dvcd = val;
									}
								}
							},{	fieldLabel	: Language.get('acpt_numb','금형코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pjod_idcd',
								pair		: 'item_name',
								clearable	: true,
								labelWidth	: 50,
								width		: 220,
								emptyText	:'조회 할 '+ Language.get('acpt_case_name', '금형명') +'을 입력하세요',
								popup: {
									select : 'SINGLE',
									widget : 'lookup-boppjod-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0',work_ordr_dvcd : '' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('pjod_idcd'));
										pairField.setValue(records[0].get('item_name'));
									}
								}
							},{ name : 'item_name', xtype:'textfield',hidden : true
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
								emptyText	: Language.get('acpt_numb', '금형코드'   )+' 또는 '+Language.get('acpt_case_name', '금형명')+'을 입력하세요....',
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
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 0 0 10',
						items	: [
							{	fieldLabel	: Language.get('regi_date','등록일자'),
								xtype		: 'betweenfield',
								name		: 'regi_date1',
								pair		: 'regi_date2',
								width		: 180,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								root		: true,
								value		:''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'regi_date2',
								pair		: 'regi_date1',
								width		: 130,
								labelWidth	: 17,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		:''
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 310,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('line_clos','마감상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_clos' ) ),
								value		: '0',
								width		: 150
							}
	 					]
					},{	xtype : 'fieldset', layout: 'hbox',border : 0 , padding : '0',margin : '2 0 0 10',
						items : [
							{	fieldLabel	: Language.get('deli_date','납기일자'),
								xtype		: 'betweenfield',
								name		: 'deli_date1',
								pair		: 'deli_date2',
								root		: true,
								width		: 180,
								value		:''
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'deli_date2',
								pair		: 'deli_date1',
								width		: 130,
								labelWidth	: 17,
								value		:''
							},{	fieldLabel	: Language.get('sale_drtr','영업담당'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'user_name',
								width		: 310,
								pair		: 'drtr_idcd',
								clearable	: true,
								popup: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('expt_dvcd','수출구분'),
								xtype		: 'lookupfield',
								name		: 'expt_dvcd',
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('expt_dvcd' )),
								value		: '',
								width		: 280
							}
						]
					}
				]
			};
			return line;
		}
});
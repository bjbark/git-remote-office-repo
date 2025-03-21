Ext.define('module.prod.project.prjtworklist.view.PrjtWorkListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-prjtworklist-search',

	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic()];
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
									emptyText	: Language.get('acpt_numb', '금형코드'	)+'를 반드시 입력해 주십시오.',
									width		: 250,
									labelWidth	: 50,
									popup: {
										select	: 'SINGLE',
										widget	: 'lookup-pjod-popup',
										params	: { stor_grp : _global.stor_grp , line_stat : '0' },
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('pjod_idcd'));
											var editor = Ext.ComponentQuery.query('module-prjtworklist-finder')[0],
												panel = editor.down('form'),
												item_name      = panel.down('[name=item_name]'),
												item_spec      = panel.down('[name=item_spec]'),
												modl_name      = panel.down('[name=modl_name]'),
												regi_date      = panel.down('[name=regi_date]'),
												drtr_name      = panel.down('[name=drtr_name]'),
												cstm_idcd      = panel.down('[name=cstm_idcd]'),
												cstm_name      = panel.down('[name=cstm_name]'),
												item_name      = panel.down('[name=item_name]'),
												item_name      = panel.down('[name=item_name]'),
												tab1           = editor.down('[title=거래처 정보]'),
												tab2           = editor.down('[title=주요 일정]'),

												ppsl_deli_date = tab2.down('[name=ppsl_deli_date]')
												cofm_date      = tab2.down('[name=cofm_date]')
												deli_date      = tab2.down('[name=deli_date]')
												frst_exam_date = tab2.down('[name=frst_exam_date]')
												send_exam_date = tab2.down('[name=send_exam_date]')
												strt_date      = tab2.down('[name=strt_date]')
												endd_date      = tab2.down('[name=endd_date]')
											;
											item_name.setValue(records[0].get('item_name'));
											item_spec.setValue(records[0].get('item_spec'));
											modl_name.setValue(records[0].get('modl_name'));
											regi_date.setValue(records[0].get('regi_date'));
											drtr_name.setValue(records[0].get('drtr_name'));
											cstm_idcd.setValue(records[0].get('cstm_idcd'));
											cstm_name.setValue(records[0].get('cstm_name'));
											item_name.setValue(records[0].get('item_name'));
											ppsl_deli_date.setValue(records[0].get('ppsl_deli_date'));
											cofm_date     .setValue(records[0].get('cofm_date'));
											deli_date     .setValue(records[0].get('deli_date'));
											frst_exam_date.setValue(records[0].get('frst_exam_date'));
											send_exam_date.setValue(records[0].get('send_exam_date'));
											strt_date     .setValue(records[0].get('strt_date'));
											endd_date     .setValue(records[0].get('endd_date'));
										}
									}
							},{ name	: 'find_name',
								xtype	: 'searchfield',
								flex	: 4,
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
	}
});
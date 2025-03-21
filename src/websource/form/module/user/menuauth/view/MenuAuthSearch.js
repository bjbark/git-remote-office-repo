Ext.define('module.user.menuauth.view.MenuAuthSearch', {extend: 'Axt.form.Search',
	alias        : 'widget.module-menuauth-search',
	initComponent: function(){
		var me = this;
		me.items =  [ me.searchBasic(),me.createLine1() ];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset' ,
				border	: 0,
				style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid'
				},
				region	: 'center',
				width	: '100%',
				height  : 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid'
						},
						region	: 'center',
						height	: 34,
						margin	: '3 3 3 0',
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								cls		: 'my-label-style',
							},{	name	: 'find_name'     ,
								xtype	: 'searchfield',
								margin	: '3 10 0 0',
								flex	: 1,
								emptyText	: '검색할 메뉴명을 입력하세요...',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치       */
												searchButton.fireEvent('click', searchButton);                /* 조회버튼 Click */
										}
									}
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
		var line =
			{	xtype		: 'fieldset',
				items : [
					{	fieldLabel	: Language.get('user_name', '사용자'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'user_name',
						pair		: 'user_idcd',
						clearable	: true ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-user-popup',
							params	: { stor_grp : _global.stor_grp },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name		: 'user_idcd', xtype : 'textfield' , hidden : true
//					},{	fieldLabel	: Language.get('stor', '사업장'),
//						xtype		: 'popupfield',
//						editable	: true,
//						enableKeyEvents : true,
//						name		: 'stor_nm',
//						pair		: 'stor_id',
//						clearable	: true ,
//						popup		: {
//							select	: 'SINGLE',
//							widget	: 'lookup-store-popup',
//							params	: { stor_grp : _global.stor_grp , row_sts : '1' },
//							result	: function(records, nameField, pairField) {
//								nameField.setValue(records[0].get('stor_nm'));
//								pairField.setValue(records[0].get('stor_id'));
//							}
//						}
//					},{	name		: 'stor_id', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('dept', '부서'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'dept_name',
						pair		: 'dept_idcd',
						clearable	: true ,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-dept-popup',
							params	: { stor_grp : _global.stor_grp },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{	name : 'dept_idcd', xtype : 'textfield' , hidden : true
					}
				]
			};
		return line;
	}
});
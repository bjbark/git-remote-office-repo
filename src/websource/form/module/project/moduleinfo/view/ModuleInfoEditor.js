Ext.define('module.project.moduleinfo.view.ModuleInfoEditor', {  extend: 'Axt.form.Editor',
	alias: 'widget.module-moduleinfo-editor',
	height : 310,
	layout : {
		type: 'border'
	},
	title : '화면 코드 정보',
	collapsible : true,
	collapsed : true ,
	defaultFocus : 'text',
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this, item =
		{
			xtype : 'toolbar',
			dock: 'bottom',
			items:
			[
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'}, '-'
			]
		};
		return item;
	},
	/**
	 *
	 */
	createWest : function () {
		var me = this,
			item = {
			xtype	: 'form-panel',
			dock	: 'left',
			width	: 330,
			bodyStyle: { padding: '5px' },
			fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
			items : [
				{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name	: 'id'         ,
							fieldLabel : '메뉴코드' ,
							xtype	: 'textfield'   ,
							readOnly: true  ,
							width	: 170 ,
							fieldCls   : 'requiredindex'
						},{	name	: 'row_sts'  ,
							xtype	: 'lookupfield' ,
							width	: 55 ,
							lookupValue : resource.lookup('line_stat') ,
							editable: false , margin : '0 0 0 5',
							value	: 0
						},{	name	: 'tree_expn_yn'  ,
							xtype	: 'lookupfield' ,
							width	: 80 ,
							lookupValue : [[false,'접혀진 상태'], [true,'펼쳐진 상태']],
							editable : false ,
							margin	: '0 0 0 5'
						}
					]
				},{	xtype		: 'textfield'   ,
					fieldLabel	: '메뉴명칭',
					name		: 'text'
				},{	xtype		: 'textfield'   ,
					fieldLabel	: '영어명',
					name		: 'menu_nm_englh'
				},{	xtype		: 'textfield'   ,
					fieldLabel	: '중국어명',
					name		: 'menu_nm_chi'
				},{	xtype		: 'textfield'   ,
					fieldLabel	: '일본어명',
					name		: 'menu_nm_jpns'
				},{	xtype		: 'textfield'   ,
					fieldLabel	: '기타명칭',
					name		: 'menu_nm_etc'
				},{	xtype 		: 'textfield'   ,
					fieldLabel 	: '모듈경로',
					name 		: 'modl_id'  ,
				},{	xtype 		: 'textfield'  , name : 'modl_nm' , fieldLabel : '컨트롤명' //, xtype : 'textarea' ,height : 60
				},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name 		: 'admin_use'   ,
							fieldLabel 	: '사용권한',
							xtype		: 'lookupfield' ,
							editable	: false ,
							lookupValue : [['Y','admin전용'],['N','일반사용자']],
							width		: 150
						},{	xtype 	   : 'numericfield',
							name       : 'row_ord',
							readOnly   : true,
							width      : 165,
							fieldLabel : Language.get('row_ord',      '순서'  )
						}
					]
				}
			]
		};// , me.createTabs()
		return item;
	},
	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0 ,
				plain	: true,
				items	: [me.createTab1(), me.createTab2()  ]
			};
		return item;
	},

	/**
	 *
	 */
	createTab1 : function() {
		var me = this,
			item = {
			title: '권한정보' ,
			xtype : 'form-panel' ,
			layout : 'vbox',
			border : 0 ,
			bodyStyle: { padding: '5px' },
			region : 'center',
			items : [
				{	xtype : 'fieldset', layout: 'hbox' , padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name		: 'inpt_use_yn',
							fieldLabel	: '등록권한'  ,
							width		: 150,
							editable	: false ,
							xtype		: 'lookupfield' ,
							lookupValue	: [[ '0' , ''] , [ '1' , '사용'] ]
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox' , padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name		: 'upt_use_yn',
							fieldLabel	: '수정권한'  ,
							width		: 150,
							editable	: false ,
							xtype		: 'lookupfield' ,
							lookupValue	: [[ '0' , ''] , [ '1' , '사용'] ]
						}
					]
				},{ xtype : 'fieldset', layout: 'hbox' , padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name		: 'del_use_yn',
							fieldLabel	: '삭제권한'  ,
							width		: 150,
							editable	: false ,

							xtype		: 'lookupfield' ,
							lookupValue	: [[ '0' , ''] , [ '1' , '사용'] ]
						}
					]
				},{ xtype : 'fieldset', layout: 'hbox' , padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name		: 'prt_use_yn',
							fieldLabel	: '출력권한'  ,
							width		: 150,
							editable	: false ,

							xtype      : 'lookupfield' ,
							lookupValue: [[ '0' , ''] , [ '1' , '사용'] ]
						}
					]
				},{	xtype : 'fieldset', layout: 'hbox' , padding:'0', border: 0,margin : '0 0 5 0',
					items : [
						{	name		: 'expt_use_yn',
							fieldLabel	: '엑셀권한'  ,
							width		: 150,
							editable	: false ,
							xtype		: 'lookupfield' ,
							lookupValue	: [[ '0' , ''] , [ '1' , '사용'] ]
						}
					]
				}
			]
	 		};
		return item;
	},
	createTab2 : function() {
		var me = this,
			item = {
				title: '메모' ,
				xtype : 'form-panel' ,
				layout : 'vbox',
				border : 0 ,
				bodyStyle: { padding: '5px' },
				region : 'center',
				items : [
					{	xtype : 'textarea'  , name : 'usr_memo'  , height : 80,width: 400}

				]
			};
		return item;
	}
});



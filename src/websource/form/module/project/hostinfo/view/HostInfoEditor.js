Ext.define('module.project.hostinfo.view.HostInfoEditor', { extend: 'Axt.form.Editor',

	alias  : 'widget.module-hostinfo-editor',
	height : 247,
	layout : {
		type: 'border'
	},
	title : 'Server Information',
	collapsible : true,
	collapsed   : true ,
	insertFocus : 'host_cd',
	modifyFocus : 'host_cd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest() ];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'}, '-'
				]
			};
		return item;
	},



	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item = {
				xtype		: 'form-panel',
				dock		: 'left',
				width		: 330,
				bodyStyle	: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				items		: [
					{
						xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{
								xtype       : 'textfield',
								name        : 'host_cd',
								maxLangth   : 50 ,
								fieldLabel  : '식별코드',
								width       : 180,
								allowBlank  : false,
								fieldCls    : 'requiredindex',
							},{
								name        : 'host_os'  ,
								xtype       : 'lookupfield',
								editable    : false ,
								width       : 70,
								lookupValue : resource.getList('server_os'),
								margin		: '0 0 0 5'


							},{
								xtype       : 'lookupfield',
								name        : 'row_sts'  ,
								lookupValue : resource.getList('line_stat'),
								width       : 55           ,
								margin      : '0 0 0 5'
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{
								fieldLabel  : '공인/내부' ,
								xtype       : 'textfield'   ,
								name        : 'host_ip'      ,
								fieldCls   	: 'requiredindex',
								width      	: 180
							},{
								xtype       : 'textfield'   ,
								name        : 'dhcp_ip'      ,
								fieldCls   	: 'requiredindex',
								width      	: 130,
								margin : '0 0 0 5'
							}
						]
					},{	fieldLabel	: '호스트명' , name : 'host_nm', xtype : 'textfield'
					},{ name		: 'user_id', xtype : 'textfield' , hidden : true
					},{	fieldLabel  : '관리구분' ,
						xtype       : 'lookupfield',
						name        : 'host_grp',
						//fieldCls    : 'requiredindex',
						lookupValue : resource.getList('server_grp'),
						allowBlank  : true,
						editable    : false ,
//width : 130 ,
//margin : '0 0 0 5'
// 	 		 	}
//
//
				},{
					xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
					items :
					[
						{
							fieldLabel  : '운영구분' ,
							name        : 'host_gb'  ,
							xtype       : 'lookupfield',
							editable    : false ,
							width       : 180 ,
							lookupValue : resource.getList('server_gb')
		 				},{

//		 	 				xtype       : 'lookupfield',
//		 	 		 		name        : 'host_gp',
//		 	 		 		//fieldCls    : 'requiredindex',
//		 	 		 		lookupValue : resource.getList('host_gp'),
//		 	 		 		allowBlank  : false,
//		 	 		 		editable    : false ,
//		 	 		 		width : 130 ,
//		 	 		 		margin : '0 0 0 5'
		 	 		 	}
		 	 		]

 	      	    },{	fieldLabel : '모델번호' , name : 'prod_model', xtype : 'textfield'
 	      	    },{	fieldLabel : '일련번호' , name : 'srl_no'    , xtype : 'textfield'
 	      	    }


//serial_number


//				.update("external_host"       , row.getParameter("external_host"  ))
//				.update("internal_host"       , row.getParameter("internal_host"  ))
//				.update("purchase_date"       , row.getParameter("purchase_date"  ))
//				.update("purchase_memo"       , row.getParameter("purchase_memo"  ))
		 	]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this, item =
		{
			xtype : 'tabpanel',
			region : 'center',
			margin : 0 ,
			plain: true,
			items: [ me.createTab1(), me.createTab2(), me.createTab3() ]
		};
		return item;
	},



	/**
	 * 메모사항
	 */
	createTab1 : function() {
		var me = this,
			item = {
				title		: '메모사항',
				xtype		: 'form-panel' ,
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{
						//fieldLabel : '' ,
						name       : 'usr_memo' ,
						xtype      : 'textarea',
						height     : 160 ,
						maxLength  : 2000 ,
						flex       : 1
					}
				]
			}
			;
		return item;
	} ,


	/**
	 * 연결정보
	 */
	createTab2 : function() {
		var me = this,
		item = {
			title	 : '연결정보',
			xtype 	 : 'form-panel' ,
			layout 	 : 'hbox',
			border 	 : 0 ,
			bodyStyle : { padding: '5px' },
			items	 : [
				{
					//fieldLabel : '' ,
					name       : 'listener_text' ,
					xtype      : 'textarea',
					height     : 160 ,
					flex       : 1
				}
			]
		}
		;
		return item;
	},


	/**
	 * 연결정보
	 */
	createTab3 : function() {
		var me = this,
		item =	{	title	 : '구매정보',
					xtype 	 : 'form-panel' ,
					layout 	 : 'hbox',
					border 	 : 0 ,
					bodyStyle : { padding: '5px' },
					items	 : [
						{	fieldLabel  : '구매일자' ,
							xtype       : 'datefield'   ,
							name        : 'pur_dt'      ,
							allowBlank  : false         ,
							editable    : false ,
							width       : 190 ,
							format      : Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD
						},{	fieldLabel : '담당자' ,
							xtype      : 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name       : 'emp_nm',
							pair       : 'usr_id',
							emptyText  : Const.infoNull.queryAll,
							clearable  : true,
							readOnly   : false,
							popup      : {
								widget : 'lookup-userinfo-popup',
								select : 'SINGLE',
								params : { row_state : 0 },
								result : function(records, nameField, pairField) {
									nameField.setValue(records[0].get('emp_nm'));
									pairField.setValue(records[0].get('usr_id'));
								}
							}
					}
				]
		};
		return item;
	}


});



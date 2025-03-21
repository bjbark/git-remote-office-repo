Ext.define('module.project.projsite.view.ProjSiteEditor', { extend: 'Axt.form.Editor',

	alias		: 'widget.module-projsite-editor',
	height		: 300,
	layout		: {
		type	: 'border'
	},
	collapsible	: true,
	collapsed	: true ,
	modifyFocus	: 'hq_nm',
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					{	text: '동기화', iconCls: Const.UPDATE.icon      , action : 'synchronizer' },'-',
					'->', '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
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
					{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel	: '본사코드' ,
								name		: 'hq_id',
								xtype		: 'textfield',
								readOnly	: true,
								fieldCls	: 'requiredindex',
								width		: 255
							},{ name		: 'row_sts'  ,
								xtype		: 'lookupfield',
								lookupValue	: resource.getList('row_sts'),
								width		: 55   ,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel : '본사이름' , name : 'hq_nm', xtype : 'textfield', fieldCls    : 'requiredindex',allowBlank  : false,
					}
				]
			};
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
				items	: [ me.createTab1(), me.createTab2(), me.createTab3(), me.createTab4() , me.createTab5() ]
			};
		return item;
	},


	createTab1 : function() {
		var item = {
			title		: '서비스정보',
			layout		: 'vbox',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
			items		: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 210,
							fieldDefaults: { width : 210, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	fieldLabel	: '서비스 상태',
									name		: 'hq_sts',
									xtype		: 'lookupfield',
									editable	: false  ,
									lookupValue	: resource.getList('hq_sts' ) //   ControlUtil.values.ContractStatus
								},{ fieldLabel	: '서비스 구분',
									name		: 'hq_gb',
									xtype		: 'lookupfield',
									editable	: false,
									fieldCls	: 'requiredindex',
									lookupValue	: resource.getList('hq_gb' )
								},{	fieldLabel	: 'EPO_DDNS' ,
									name		: 'epo_ddns',
									xtype		: 'textfield'
								}
							]
						},{	xtype		: 'form-panel',
							border		: 0,
							width		: 210,
							fieldDefaults: { width : 210, labelWidth : 60, labelSeparator : '' },
							items		: [
							 	{	fieldLabel	: '삭제 여부',
									name		: 'del_yn',
									xtype		: 'lookupfield',
									editable	: false,
									lookupValue	: resource.getList('del_yn' )
								},{	fieldLabel	: '등록일자' ,
									xtype		: 'datefield',
									name		: 'hq_reg_dt',
									allowBlank	: true,
									editable	: false,
									readOnly	: true,
									fieldCls	: 'readonlyfield' ,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD
								}
							]
						}
					]
				},{ fieldLabel	: 'UpdateUrl',
					name		: 'pgm_updat_path'  ,
					xtype		: 'textfield' ,
					width		: 420
				},{ fieldLabel	: '상품검색',
					name		: 'itm_typl_nm'  ,
					xtype		: 'textarea' ,
					height		: 32 ,
					width		: 420
				}
			]
		};
		return item;
	},

	createTab2 : function() {
		var me = this,
			item = {
				title	: 'Data Base 서버' ,
				xtype	: 'form-panel' ,
				layout	: 'vbox',
				border	: 0 ,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 100, labelSeparator : '' },
				region	: 'center',
				items	: [
					{	xtype		: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items		: [
							{	fieldLabel	: '서버정보',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'pos_hostname',
								pair		: 'pos_host',
								emptyText	: Const.infoNull.queryAll,
								clearable	: false,
								readOnly	: false,
								fieldCls	: 'requiredindex',
								popup		: {
									widget	: 'lookup-hostinfo-popup',
									select	: 'SINGLE',
									params	: { row_sts : 0 },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('host_cd'));
										pairField.setValue(records[0].get('host_id'));
									}
								}
							},
						]
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	xtype		: 'textfield',
								fieldLabel	: ' ',
								name		: 'pos_host' ,
								fieldCls	: 'requiredindex',
								emptyText	: '서버 아이피 등 주소'
							},{ name		: 'pos_hostport',
								xtype		: 'textfield',
								width		: 50,
								fieldCls	: 'requiredindex',
								emptyText	: '접속포트',
								margin		: '0 0 0 5'
							},{ name		: 'pos_provider',
								xtype		: 'lookupfield',
								width		: 70,
								editable	: false,
								lookupValue : resource.lookup('provider' ),
								fieldCls	: 'requiredindex',
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel : 'DB Name'   		, name : 'pos_hostpath', xtype : 'textfield'
					},{	fieldLabel : 'User'   			, name : 'pos_hostuser', xtype : 'textfield'
					},{	fieldLabel : 'DB Password'   	, name : 'pos_hostpswd', xtype : 'textfield'
					},{	fieldLabel : '풀유지타임' 		, name : 'pos_pooltime', xtype : 'textfield'
					},{	fieldLabel : 'Max Connection'	, name : 'pos_maxcount', xtype : 'textfield'
					}
			]
		};
		return item;
	},

	createTab3 : function() {
		var me = this,
			item = {
				title	: '쇼핑몰 서버' ,
				xtype	: 'form-panel' ,
				layout	: 'vbox',
				border	: 0 ,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				region	: 'center',
				items	: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: '서버정보',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'web_hostname',
								pair		: 'web_host',
								emptyText	: Const.infoNull.queryAll,
								clearable	: false,
								readOnly	: false,
								fieldCls	: 'requiredindex',
								width		: 185 ,
								popup		: {
									widget	: 'lookup-hostinfo-popup',
									select	: 'SINGLE',
									params	: { row_sts : 0 },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('host_cd'));
										pairField.setValue(records[0].get('host_id'));
									}
								}
							},{ xtype		: 'textfield', name : 'web_host' , hidden : true
							},{ name		: 'web_hostport',
								xtype		: 'textfield',
								width		: 50,
								fieldCls	: 'requiredindex',
								margin		: '0 0 0 5'
							},{ name		: 'web_provider',
								xtype		: 'lookupfield',
								width		: 70,
								editable	: false,
								lookupValue : resource.lookupValue('provider' ),
								fieldCls	: 'requiredindex' ,
								margin		: '0 0 0 5'
							}
						]
//				},{	  //
//					xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
//					items :
//					[
//						{
//							fieldLabel : '서비스명'   , name : 'web_hostpath', xtype : 'textfield' ,
//							width       : 210
//						},{
//							name        : 'web_provider',
//							xtype       : 'lookupfield',
//							width       : 100,
//							lookupValue : resource.lookupValue('sql_gb' ),
//							fieldCls   : 'requiredindex' ,
//							margin : '0 0 0 5'
//						}
//					]
				},{	fieldLabel : '서비스명'   , name : 'web_hostpath', xtype : 'textfield'
				},{	fieldLabel : '접속계정'   , name : 'web_hostuser', xtype : 'textfield'
				},{	fieldLabel : '접속암호'   , name : 'web_hostpswd', xtype : 'textfield'
				},{	fieldLabel : '풀유지타임' , name : 'web_pooltime', xtype : 'textfield'
				},{	fieldLabel : '최대커낵션' , name : 'web_maxcount', xtype : 'textfield'
				}
			]
		};
		return item;
	},



	createTab4 : function() {
		var me = this,
			item = {
				title	: '이미지 서버' ,
				xtype	: 'form-panel' ,
				layout	: 'vbox',
				border	: 0 ,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
				region	: 'center',
				items	: [
					{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel	: '서버정보',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'img_hostname',
								pair		: 'img_host',
								emptyText	: Const.infoNull.queryAll,
								clearable	: false,
								readOnly	: false,
								fieldCls	: 'requiredindex',
								width		: 185 ,
								popup		: {
									widget	: 'lookup-hostinfo-popup',
									select	: 'SINGLE',
									params	: { row_sts : 0 },
									result	: function(records, nameField, pairField) {
										console.debug( records, nameField, pairField   ) ;
										console.debug( records[0], nameField, pairField   ) ;

										nameField.setValue(records[0].get('host_cd'));
										pairField.setValue(records[0].get('host_id'));
									}
								}
							},{	xtype		: 'textfield', name : 'img_host' , hidden : true
							},{	name		: 'img_hostport',
								xtype		: 'textfield',
								width		: 50,
								fieldCls	: 'requiredindex',
								margin		: '0 0 0 5'
							},{	name		: 'img_provider',
								xtype		: 'lookupfield',
								width		: 70,
								editable	: false,
								lookupValue	: resource.lookupValue('ftp_provider' ),
								fieldCls	: 'requiredindex' ,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: '프로토콜'   ,
						name		: 'img_protocol',
						xtype		: 'lookupfield',
						//width       : 70,
						lookupValue : resource.lookupValue('protocol' ),
						fieldCls	: 'requiredindex'
					},{	fieldLabel	: '디렉토리'   , name : 'img_hostpath', xtype : 'textfield'
					},{	fieldLabel	: '접속계정'   , name : 'img_hostuser', xtype : 'textfield'
					},{	fieldLabel	: '접속암호'   , name : 'img_hostpswd', xtype : 'textfield'
					},{	fieldLabel	: 'HTTP URL'  , name : 'img_http'    , xtype : 'textfield'
					}
				]
			};
		return item;
	},

	/**
	 *
	 */
	createTab5 : function() {
		var me = this,
			item = {
			title	: '메모사항' ,
			xtype	: 'form-panel' ,
			layout	: 'hbox',
			border	: 0 ,
			bodyStyle: { padding: '5px' },
			items	: [
				{	fieldLabel	: '' ,
					name		: 'usr_memo' ,
					xtype		: 'textarea',
					height		: 157 ,
					flex		: 1
				}
			]
		};
		return item;
	}

});



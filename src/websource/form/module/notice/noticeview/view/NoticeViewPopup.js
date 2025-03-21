Ext.define('module.notice.noticeview.view.NoticeViewPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-noticeview-popup',

	title		: '공지사항',
	closable	: true,
	autoShow	: true,
	width		: 600 ,
	height		: 850,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);

	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{	xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{	xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '15 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('ntce_ttle','제목')	,
							xtype		: 'textfield',
							name		: 'ntce_ttle',
							itemId		: 'ntce_ttle',
							readOnly	: true,
							value		: me.params.ntce_ttle,
							width		: 550,
							labelWidth	: 60,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '0 3 0 0'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('sbsd_ttle','부제목')	,
							xtype		: 'textfield',
							name		: 'sbsd_ttle',
							itemId		: 'sbsd_ttle',
							readOnly	: true,
							value		: me.params.sbsd_ttle,
							width		: 315,
							labelWidth	: 60,
							margin		: '0 3 0 0'
						},{	fieldLabel	: Language.get('dwup_empy_idcd','작성사원'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'dwup_empy_name',
							itemId		: 'dwup_empy_name',
							pair		: 'dwup_empy_idcd',
							readOnly	: true,
							value		: me.params.dwup_empy_name,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							width		: 232,
							labelWidth	: 70,
							margin		: '0 3 0 0',
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-user-popup',
								params	: { stor_grp : _global.stor_grp, line_stat : '0' },
								result	: function(records, nameField, pairField){
									nameField.setValue(records[0].get('user_name'));
									pairField.setValue(records[0].get('user_idcd'));
								}
							}
						},{	name	: 'dwup_empy_idcd', xtype : 'textfield' , hidden : true
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dwup_empy_idcd','작성사원ID'),
							xtype		: 'textfield',
							hidden		: true,
							name		: 'dwup_empy_idcd',
							value		: me.params.dwup_empy_idcd,
							width		: 200,
							labelWidth	: 95,
							margin		: '0 0 5 0'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '0 0 0 0',
					items	: [
							{name	: 'invc_numb', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('ntce_stdt','공지기간'),
							xtype		: 'datefield',
							name		: 'ntce_stdt',
							itemId		: 'ntce_stdt',
							margin		: '0 3 0 0',
							readOnly	: true,
							width		: 175,
							labelWidth	: 60,
							value		: me.params.ntce_stdt,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							listeners	:{
								change	: function(a){
								}
							},
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'datefield',
							name		: 'ntce_eddt',
							itemId		: 'ntce_eddt',
							margin		: '0 3 0 0',
							readOnly	: true,
							width		: 135,
							labelWidth	: 20,
							value		: me.params.ntce_eddt,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('emgc_yorn','긴급'),
							xtype		: 'lookupfield',
							name		: 'emgc_yorn',
							margin		: '0 3 0 0',
							readOnly	: true,
							value		: this.params.emgc_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 130,
							labelWidth	: 72,
						},{	fieldLabel	: Language.get('pswd','비밀번호')	,
							xtype		: 'textfield',
							name		: 'pswd',
							hidden		: true,
							itemId		: 'pswd',
							readOnly	: true,
							value		: this.params.pswd,
							width		: 235,
							labelWidth	: 80,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('dwup_date','작성일자'),
							hidden		: true,
							xtype		: 'datefield',
							name		: 'dwup_date',
							readOnly	: true,
							width		: 215,
							labelWidth	: 90,
							value		: me.params.dwup_date,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('dwup_time','작성시간'),
							hidden		: true,
							xtype		: 'datefield',
							name		: 'dwup_time',
							itemId		: 'dwup_time',
							readOnly	: true,
							width		: 215,
							labelWidth	: 60,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('scrt_yorn','보안'),
							xtype		: 'lookupfield',
							name		: 'scrt_yorn',
							readOnly	: true,
							value		: me.params.scrt_yorn,
							hidden		: true,
							lookupValue	: resource.lookup('yorn'),
							width		: 120,
							labelWidth	: 60,
						},{	fieldLabel	: Language.get('ansr_yorn','답여부'),
							xtype		: 'lookupfield',
							name		: 'ansr_yorn',
							hidden		: true,
							readOnly	: true,
							value		: me.params.ansr_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 105,
							labelWidth	: 40,
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('user_memo','메모') 		,
							name		: 'user_memo',
							itemId		: 'user_memo',
							readOnly	: true,
							hidden		: true,
							xtype		: 'textarea',
							value		: me.params.user_memo,
							emptyText	: '메모사항을 적어주십시오',
							width		: 550,
							labelWidth	: 60,
						},{	fieldLabel	: '' ,
							name		: 'lookup_val',
							xtype		: 'textarea'  ,
							readOnly	: true,
							hidden		: true
						}
					]
				},{	xtype	: 'form-panel',
					margin	: '5 0 0 0',
					region	: 'center',
					title	: '공지내용',
					fieldDefaults	: { width : 550, height :550, labelSeparator : '' },
					items	: [
						{	xtype		: 'htmleditor',
							name		: 'ntce_cont',
							width		: 586,
							labelWidth	: 400,
							margin		: '0 15 0 0',
							readOnly	: true,
							itemId		: 'ntce_cont',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							listeners:{
								render:function(field){
									var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
									var fileReader = new FileReader();
									var img = new Uint8Array(me.params.ntce_cont.split(",")),
										blob = new Blob([img],{type:'text/plain'})
//										url = URL.createObjectURL(blob),
									;
									mask.show();
									fileReader.readAsText(blob,"UTF-8");
									setTimeout(function(){
										field.setValue(fileReader.result);
										mask.hide();
									},200);
								}
							}
						}
					],
				},
				{	xtype	: 'form-panel',
					title	: '답글내용',
					fieldDefaults	: { width : 700, height :140, labelSeparator : '' },
					items	: [
						{	xtype		: 'textarea',
							name		: 'ansr_cont',
							itemId		: 'ansr_cont',
							value		: this.params.ansr_cont,
							width		: 586,
							labelWidth	: 200,
						}
					]
					},{	name : '_set'		,value : this.params._set,      xtype : 'textfield' , hidden : true
					},{	name : 'invc_numb'	,value : this.params.invc_numb, xtype : 'textfield' , hidden : true
					},{	name : 'line_seqn'	,xtype : 'textfield'          , hidden: true        , itemId : 'line_seqn'
					},{	name : 'insp_yorn'	,value : this.params.insp_yorn, xtype : 'textfield' , hidden : true
					},{	name : 'insp_dttm'	, xtype : 'textfield'         , hidden : true
					}
				]
			}
	return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			store	= Ext.ComponentQuery.query('module-noticeview-lister-master')[0].getStore();
			form= this.params.invc_numb
		;

		Ext.Ajax.request({
			url		: _global.location.http() + '/notice/noticeview/set/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					invc_numb		: form,
					ansr_cont		: values.ansr_cont,
					insp_yorn		: '1',
					empy_idcd		: _global.login_id,
					_set			: values._set,
					table_nm	: 'ntce_view',
				})
			},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						store.reload();
						me.setResponse( {success : true ,  values : baseform , values :form });
					}
				},
				failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	}
});

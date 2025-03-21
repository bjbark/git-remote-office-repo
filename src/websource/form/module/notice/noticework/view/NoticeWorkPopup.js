Ext.define('module.notice.noticework.view.NoticeWorkPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-noticework-popup',

	title		: '공지사항',
	closable	: true,
	autoShow	: true,
	width		: 600 ,
	height		: 600,
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
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
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
					margin	: '10 0 0 0',
					items	: [
						{	fieldLabel	: Language.get('ntce_ttle','제목')	,
							xtype		: 'textfield',
							name		: 'ntce_ttle',
							itemId		: 'ntce_ttle',
							value		: this.params.ntce_ttle,
							width		: 550,
							labelWidth	: 60,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							margin		: '0 0 5 0'
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
							value		: this.params.sbsd_ttle,
							width		: 315,
							labelWidth	: 60,
							margin		: '0 0 5 0',
						},{	fieldLabel	: Language.get('dwup_empy_idcd','작성사원'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'dwup_empy_name',
							itemId		: 'dwup_empy_name',
							pair		: 'dwup_empy_idcd',
							value		: this.params.dwup_empy_name,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							clearable	: false ,
							width		: 235,
							labelWidth	: 80,
							margin		: '0 0 5 0',
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
							value		: this.params.dwup_empy_idcd,
							width		: 200,
							labelWidth	: 95,
							margin		: '0 0 5 0'
						}
					]
				},{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					margin	: '5 0 0 0',
					items	: [
						{	name	: 'invc_numb', xtype : 'textfield' , hidden : true
						},{	fieldLabel	: Language.get('ntce_stdt','공지기간'),
							xtype		: 'datefield',
							name		: 'ntce_stdt',
							itemId		: 'ntce_stdt',
							width		: 175,
							labelWidth	: 55,
							value		: this.params.ntce_stdt,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							listeners	:{
								change	: function(a){
								}
							},
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							margin : '0 0 0 5'
						},{	fieldLabel	: Language.get('','~'),
							xtype		: 'datefield',
							name		: 'ntce_eddt',
							itemId		: 'ntce_eddt',
							width		: 135,
							labelWidth	: 20,
							value		: this.params.ntce_eddt,
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							margin : '0 0 0 0'
						},{	fieldLabel	: Language.get('pswd','비밀번호')	,
							xtype		: 'textfield',
							name		: 'pswd',
							itemId		: 'pswd',
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
							width		: 215,
							labelWidth	: 90,
							value		: this.params.dwup_date,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
						},{	fieldLabel	: Language.get('dwup_time','작성시간'),
							hidden		: true,
							xtype		: 'datefield',
							name		: 'dwup_time',
							itemId		: 'dwup_time',
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
							value		: this.params.scrt_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 120,
							labelWidth	: 60,
						},{	fieldLabel	: Language.get('emgc_yorn','긴급'),
							xtype		: 'lookupfield',
							name		: 'emgc_yorn',
							value		: this.params.emgc_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 90,
							labelWidth	: 30,
						},{	fieldLabel	: Language.get('ansr_yorn','답여부'),
							xtype		: 'lookupfield',
							name		: 'ansr_yorn',
							value		: this.params.ansr_yorn,
							lookupValue	: resource.lookup('yorn'),
							width		: 105,
							labelWidth	: 40,
						},{	fieldLabel	: Language.get('ntce_dvcd','공지구분'),
							xtype		: 'lookupfield',
							name		: 'ntce_dvcd',
							value		: this.params.ntce_dvcd,
							lookupValue	: resource.lookup('ntce_dvcd'),
							width		: 235,
							labelWidth	: 80
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
							xtype		: 'textarea',
							value		: this.params.user_memo,
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
				},{
					xtype	: 'form-panel',
					margin	: '10 0 0 0',
					region	: 'center',
					title	: '공지내용',
					fieldDefaults	: { width : 550, height :300, labelSeparator : '' },
					items	:[
						{	xtype	: 'htmleditor',
							name	: 'ntce_cont',
							itemId		: 'ntce_cont',
							allowBlank	: false,
							fieldCls	: 'requiredindex',
							emptyText	: Const.invalid.emptyValue,
							value		: '',
							listeners:{
								render:function(field){
									var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
									var fileReader = new FileReader();
									var img = new Uint8Array(me.params.ntce_cont.split(",")),
										blob = new Blob([img],{type:'text/plain'})
									;
									mask.show();
									fileReader.readAsText(blob,"UTF-8");
									setTimeout(function(){
										field.setValue(fileReader.result);
										mask.hide();
									},50);
								}
							}
						},{	name	: '_set',value : this.params._set, xtype : 'textfield' , hidden : true
						},{	name	: 'invc_numb',value : this.params.invc_numb, xtype : 'textfield' , hidden : true
						}
					]
				}
			]
		};
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
			store	= Ext.ComponentQuery.query('module-noticework-lister-master')[0].getStore();
			form= this.params.invc_numb
		;
		var a = Ext.ComponentQuery.query('#ntce_ttle')[0].getValue(); //제목
		var b = Ext.ComponentQuery.query('#dwup_empy_name')[0].getValue(); //작성사원

		if(a== null || a==''){
			Ext.Msg.show({ title: '알림', msg: '제목이 반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
		}else{
			if(b== null || b==''){
				Ext.Msg.show({ title: '알림', msg: '작성사원명이  반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			}else{
				if(values.ntce_stdt== null || values.ntce_stdt==''){
					Ext.Msg.show({ title: '알림', msg: '공지시작일이  반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
				}else{
					if(values.ntce_eddt== null || values.ntce_eddt==''){
						Ext.Msg.show({ title: '알림', msg: '공지종료일이  반드시 있어야합니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
					}else{
						Ext.Ajax.request({
							url		: _global.location.http() + '/notice/noticework/set/insp.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: form,
									pswd			: values.pswd,
									ntce_cont		: values.ntce_cont,
									emgc_yorn		: values.emgc_yorn,
									ansr_yorn		: values.ansr_yorn,
									scrt_yorn		: values.scrt_yorn,
									ntce_eddt		: values.ntce_eddt,
									ntce_stdt		: values.ntce_stdt,
									ntce_dvcd		: values.ntce_dvcd,
									dwup_empy_name	: values.dwup_empy_name,
									sbsd_ttle		: values.sbsd_ttle,
									ntce_ttle		: values.ntce_ttle,
									dwup_date		: values.dwup_date,
									user_memo		: values.user_memo,
									_set			: values._set,
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
									me.close;
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
				}
			}
		}
	}
});
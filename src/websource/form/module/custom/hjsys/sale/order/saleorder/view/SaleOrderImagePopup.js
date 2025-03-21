Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderImagePopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-saleorder-popup'			,

	title: '도면 업로드',

	closable: true,
	autoShow: true,
	width: 380,
	height: 160,
	layout: {
		type: 'border'
	},

	waitMsg : Const.INSERT.mask,

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this;
		if (!me.popup.values){ me.popup.values ={}; }
		if (!me.popup.option){ me.popup.option ={}; }
		me.items = [me.createForm()];
		me.callParent(arguments);
	},

	listeners:{
		show:function(){
			if(!this.popup.params.invc_numb){
				Ext.Msg.alert('알림','항목을 선택하여주세요.');
				this.hide();
			}
		},
	},
	createForm: function(){
		var me = this, form =
		{
			xtype		: 'form-panel',
			region		: 'center',
			border		:  false,
			dockedItems	:
			[
				{
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	:
					[
						'->' ,
						{xtype : 'button' , text : '<span style="color:white">업로드</span>' , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype : 'button' , text : '<span style="color:white">닫 기</span>'  , iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
					]
				}
			],
			items : [ me.editorForm() ]
		};
		return form;
	},



	/**
	 * form 생성
	 */
	editorForm: function(){
		var me = this;
		var form =
		{
			xtype	:'form-panel' ,
			region	:'center',
			layout	: 'border',
			border	: false,
			layout	: { type: 'vbox', /*align: 'stretch'*/} ,
			items	: [
				{
					xtype			: 'form-panel',
					name			: 'uploadForm',
					region			: 'center',
					standardSubmit	: false,
					border			:  false,
					url				: 'system/custom/hjsys/sale/order/saleorder/set/fileUpload.do',
					timeout			: 120000,
					method			: 'POST',
					layout			: { type: 'vbox', align: 'stretch' } ,
					padding			: 10 ,
					margin			: 0,
					renderTo		: Ext.getBody(),
					items			:
					[
						{
							xtype	: 'label',
							text	: '업로드할 파일을 선택 하여 주시기 바랍니다.' ,
							margin	: '0 0 5 0'
						},{	xtype		: 'filefield',
							name		: 'files',
							fieldLabel	: '첨부파일',
							allowBlank	: false,
							anchor		: '100%',
							width		: 300,
							buttonText	: '선택',
							regex       : new RegExp('\.(jpg|gif|png|pdf)', 'i'), // 확장자 제한 정규식
							listeners	: {
								render	: function(field) {
									field.fileInputEl.set({
										multiple : false
									});
								}
							}
						},{xtype:'hiddenfield', name:'param', value:''
						},{xtype:'hiddenfield', name:'token', value:_global.token_id}
					]
				},{	layout	: 'hbox',
					border	: 0,
					items	: [
						{ fieldLabel	: '파일명',
							xtype		: 'textfield',
							name		: 'file_name',
							margin		: '0 3 0 10',
							width		: 262,
							value		: (me.params.file_nm?me.params.file_nm:me.params.drwg_numb+'-'+me.params.revs_numb)
						},{ xtype		: 'button',
							text		: '변경',
							hidden		: (me.popup.params.drwg_chek==0),
							listeners	: {
								click:function(){
									var file_name = me.down('[name=file_name]').getValue(),
										files = me.down('[name=files]').getValue(),
										extenstion = '';
									;

									if(files.split('.')[files.split('.').length -1]=='pdf'){
										extenstion = '.png';
									}else{
										if(file_name.indexOf('.')==-1){
											extenstion = '.'+files.split('.')[files.split('.').length -1];
										}
									}
									if(file_name == '' || file_name == null){
										Ext.Msg.alert('알림','파일명이 없습니다. 파일명을 확인해주세요.');
									}else{
										Ext.Msg.show({ title: '확인', msg: '이미지 서버 파일의 파일명도 같이 변경하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
											fn: function (button) {
												if (button=='yes') {
													Ext.Ajax.request({
														url		: _global.location.http() + '/upload/get/fileRename.do',
														params	: {
															token : _global.token_id,
															param : JSON.stringify({
																stor_id			: _global.stor_id,
																hqof_idcd		: _global.hqof_idcd,
																orgn_dvcd		: 'acpt_item',
																invc_numb		: me.params.invc_numb,
																assi_seqn		: 1,
																line_seqn		: me.params.line_seqn,
																file_name		: (file_name?file_name:filename.split('.')[0])+extenstion,
																be_file_name	: me.params.file_nm
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
																Ext.Msg.alert('알림','변경완료');
															}
														},
														failure : function(result, request) {
														},
														callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
														}
													});
												}else{
													Ext.Ajax.request({
														url		: _global.location.http() + '/custom/hjsys/sale/order/saleorder/set/fileName.do',
														params	: {
															token : _global.token_id,
															param : JSON.stringify({
																stor_id			: _global.stor_id,
																hqof_idcd		: _global.hqof_idcd,
																orgn_dvcd		: 'acpt_item',
																invc_numb		: me.params.invc_numb,
																assi_seqn		: 1,
																line_seqn		: me.params.line_seqn,
																file_name		: (file_name?file_name:filename.split('.')[0])
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
																Ext.Msg.alert('알림','변경완료');
															}
														},
														failure : function(result, request) {
														},
														callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
														}
													});
												}
											}
										});
									}
								}
							}
						}
					]
				},
			]
		};
		return form;
	},

	/**
	 *
	 * 이미지 업로드 팝업에서 확인버튼 (서버에 이미지 전송)
	 */
	finishAction : function (button) {
		var me				= this,
			param			= {},
			lister			= Ext.ComponentQuery.query('module-saleorder-tree')[0],
			store			= lister.getStore(),
			fileNameIndex	= me.down('[name=files]').getValue().lastIndexOf("\\"),
			beforName		= me.down('[name=files]').getValue(),
			filename		= beforName.substr(fileNameIndex+1,beforName.length);
			orgn_dvcd		= 'acpt_item',
			invc_numb		= me.popup.params.invc_numb,												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함
			line_seqn		= me.popup.params.line_seqn,												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함
			assi_seqn		= me.popup.params.assi_seqn,
			drChk			= me.popup.params.drChk,
			chk				= me.popup.params.chk,
			drwg_numb		= me.popup.params.drwg_numb,
			revs_numb		= me.popup.params.revs_numb
			file_name		= me.down('[name=file_name]').getValue()
		;
			// submit할 form가져오기
		var uploadForm = me.down('[name=uploadForm]');
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일을 확인해 주십시오.');
			return;
		}


		var extenstion = '';

		if(beforName.split('.')[beforName.split('.').length -1]=='pdf'){
			extenstion = '.png';
		}else{
			if(file_name.indexOf('.')==-1){
				extenstion = '.'+beforName.split('.')[beforName.split('.').length -1];
			}
		}
		param.stor_grp  = _global.stor_grp;
		param.stor_id   = _global.stor_id;
		param.file_name = (file_name?file_name:filename.split('.')[0])+extenstion;
		param.orgn_dvcd = orgn_dvcd;
		param.invc_numb = invc_numb;
		param.assi_seqn = assi_seqn;
		param.line_seqn = line_seqn;
		param.hqof_idcd = _global.hqof_idcd;
		param.file_dvcd_1fst = '3100'; //도면자료
		//개발자정의 파라미터 삽입
		Ext.merge(param, me.params);
		// 파라미터 삽입
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});
		Ext.Ajax.request({
			url		: _global.location.http() + '/upload/get/fileDelete.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					orgn_dvcd		: orgn_dvcd,
					invc_numb		: invc_numb,
					assi_seqn		: assi_seqn,
					line_seqn		: line_seqn,
					file_name		: me.params.file_nm
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

				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				store.reload();
				me.close();
				lister.getSelectionModel().select(0);
			},
			failure: function(form, action) {
				Ext.Msg.alert( '알림', '업로드 실패 했습니다.' );
				me.close();
			}
		});
	}
});
Ext.define('module.workshop.sale.order.estilist.view.EstiListUploadPopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-estilist-upload-popup'			,

	title: '도면 업로드',

	closable: true,
	autoShow: true,
	width: 380,
	height: 120,
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
				}
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
			orgn_dvcd		= 'acpt_item',
			invc_numb		= me.popup.params.invc_numb,												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함
			line_seqn		= me.popup.params.line_seqn												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함,
			assi_seqn		= 1
		;
			// submit할 form가져오기
		var uploadForm = me.down('[name=uploadForm]');
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일을 확인해 주십시오.');
			return;
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/upload/get/getfileseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					orgn_dvcd		: orgn_dvcd,
					invc_numb		: invc_numb,
					line_seqn		: line_seqn,
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
					if(result.records.length > 0){
						assi_seqn = result.records[0].assi_seqn+1;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		param.stor_grp  = _global.stor_grp;
		param.stor_id   = _global.stor_id;
		param.orgn_dvcd = orgn_dvcd;
		param.invc_numb = invc_numb;
		param.line_seqn = line_seqn;
		param.assi_seqn = assi_seqn;
		param.hqof_idcd = _global.hqof_idcd;
		//개발자정의 파라미터 삽입
		Ext.merge(param, me.params);
		// 파라미터 삽입
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});

//		Ext.Ajax.request({
//			url		: _global.location.http() + '/upload/get/fileDelete.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					stor_id			: _global.stor_id,
//					hqof_idcd		: _global.hqof_idcd,
//					orgn_dvcd		: orgn_dvcd,
//					invc_numb		: invc_numb,
//					assi_seqn		: assi_seqn,
//					line_seqn		: line_seqn,
//					file_name		: me.params.file_nm
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					Ext.Msg.error(result.message );
//					return;
//				} else {
//
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});
		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				me.close();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '알림', '업로드 실패 했습니다.' );
			}
		});
	}
});
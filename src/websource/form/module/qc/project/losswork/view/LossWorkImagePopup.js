Ext.define('module.qc.project.testprod.view.LossWorkImagePopup', { extend: 'Axt.popup.Upload',
	alias		: 'widget.module-losswork-popup'			,
//	store		: 'module.qc.project.testprod.store.LossWorkImagePopup',

	title: '첨부 파일 업로드',

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
		}
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
						{xtype : 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'}
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
			layout	: { type: 'vbox', align: 'stretch'} ,
			items	:
			[
				{
					xtype			: 'form-panel',
					name			: 'uploadForm',
					region			: 'center',
					standardSubmit	: false,
					border			:  false,
					url				: 'system/qc/project/losswork/set/image.do',
					timeout			: 120000,
					method			: 'POST',
					layout			: { type: 'vbox', align: 'stretch' } ,
					padding			: 10 ,
					renderTo		: Ext.getBody(),
					items			:
					[
						{
							xtype	: 'label',
							text	: '업로드할 파일을 선택 하여 주시기 바랍니다.' ,
							margin	: '0 0 5 0'
						},{
							xtype		: 'filefield',
							name		: 'files',
							fieldLabel	: '첨부파일',
							msgTarget	: 'side',
							allowBlank	: false,
							anchor		: '100%',
							width		: 350,
							buttonText	: '선택',
							regex       : new RegExp('\.(jpg|gif|png)', 'i'), // 확장자 제한 정규식
							listeners	: {
								render	: function(field) {
									field.fileInputEl.set({
										multiple : true
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
		var me				= this;
		var param			= {};
			invc_numb		= this.popup.params.invc_numb,												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함
			line_seqn		= '1'
		;
		if(invc_numb==""||invc_numb==null){
			Ext.Msg.error("신규등록 완료 후 파일저장 가능합니다.");
		}else{
			Ext.Ajax.request({
				url			: _global.location.http() + '/qc/project/losswork/get/imgseqn.do',			// seqn을 불러온다.
				params		: {
					token	: _global.token_id,
					param	: JSON.stringify({
						stor_id			: _global.stor_id,
						invc_numb		: invc_numb,													//invc_numb와 orgn_dvcd(테이블명)이 필요하다.
					})
				},
				async		: false,
				method		: 'POST',
				success		: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						if(result.records[0].seq) line_seqn = Number(result.records[0].seq);
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					return false;
				}
			});

			param.invc_numb = invc_numb;
			param.line_seqn = line_seqn;
			Ext.merge(param, me.params);

			// submit할 form가져오기
			var uploadForm = me.down('[name=uploadForm]');
			if(!uploadForm.isValid()) {
				Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일을 확인해 주십시오.');
				return;
			}

			// 파라미터 삽입
			uploadForm.getForm().setValues({
				param : JSON.stringify(param)
			});

			// submit
			uploadForm.getForm().submit({
				waitMsg:me.waitMsg, // progressbar 띄우기
				success:function(form, action){
					Ext.Msg.alert( '', '업로드 성공 했습니다.' );
					me.close();
				},
				failure: function(form, action) {
					Ext.Msg.alert( '', '업로드 실패 했습니다.' );
					me.close();
				}
			});
		}
	}
});
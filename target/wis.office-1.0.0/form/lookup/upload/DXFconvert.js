/**
 * 아이템 이미지 업로드 팝업
 */
Ext.define('lookup.upload.DXFconvert', {  extend: 'Axt.popup.Upload',

	alias: 'widget.lookup-board-dxfconvert',

	title: 'DXF 업로드',

	closable: true,
	autoShow: true,
	width: 380,
	height: 170,
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
			{	xtype		: 'form-panel',
				region		: 'center',
				border		:  false,
				dockedItems	:[
					{	xtype	: 'toolbar',
						dock	: 'bottom',
						items	: [
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
			items	:[
				{	xtype			: 'form-panel',
					name			: 'uploadForm',
					region			: 'center',
					standardSubmit	: false,
					border			: false,
					url				: 'system/testcall/setDXFupload.do',
					timeout			: 120000,
					method			: 'POST',
					layout			: { type: 'vbox', align: 'stretch' } ,
					padding			: 10 ,
					renderTo		: Ext.getBody(),
					items			:[
						{	xtype	: 'label',
							text	: '업로드할 파일을 선택 하여 주시기 바랍니다.' ,
							margin	: '0 0 5 0'
						},
						{	xtype		: 'filefield',
							name		: 'files',
							fieldLabel	: '첨부파일',
							msgTarget	: 'side',
							allowBlank	: false,
							anchor		: '100%',
							width		: 350,
							buttonText	: '선택',
							margin	: '5 0 0 0',
							regex: /([^\s]+(?=\.(dxf))\.\2)/,
							regexText: 'DXF 확장자 파일만 업로드 가능합니다.',
							listeners	: {
								render	: function(field) {
									field.fileInputEl.set({
										multiple : true
									});
								}
							}
						},{	fieldLabel	: '제목',
							xtype : 'textfield',
							name  : 'file_ttle',
							margin	: '10 0 0 0'
						},
						{xtype:'hiddenfield', name:'param', value:''},
						{xtype:'hiddenfield', name:'token', value:_global.token_id}
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
			fileNameIndex	= me.down('[name=files]').getValue().lastIndexOf("\\"),
			beforName		= me.down('[name=files]').getValue(),
			file_ttle		= me.down('[name=file_ttle]').getValue(),
			filename		= beforName.substr(fileNameIndex+1,beforName.length)
//			invc_numb		= this.popup.params.invc_numb,												// 팝업창을 render할때 불러온 params 이전 lister에서 보내줘야함
//			orgn_dvcd		= this.popup.params.orgn_dvcd,
//			line_seqn		= this.popup.params.line_seqn,
//			assi_seqn		= 1
		;

		param.stor_grp  = _global.stor_grp;
		param.stor_id = _global.stor_id;
		param.file_name = filename;
//			param.orgn_dvcd = orgn_dvcd;
//			param.invc_numb = invc_numb;
//			param.line_seqn = line_seqn;
//			param.assi_seqn = assi_seqn;
		param.hqof_idcd = _global.hqof_idcd;
		param.file_ttle = file_ttle;
		//개발자정의 파라미터 삽입
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
				me.popup.result();
				me.close();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '업로드 실패 했습니다.' );
				me.close();
			}
		});
	},

	showAction : function(){

	}

});

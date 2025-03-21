Ext.define('module.custom.aone.prod.order.sorderworkentry.view.SorderWorkEntryFile', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-sorderworkentry-file'			,
	store		: 'module.custom.aone.prod.order.sorderworkentry.store.SorderWorkEntryFile',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'form-panel',
				dock	: 'bottom',
				itemId	: 'attachItem',
				fbar	: [
					{	xtype			: 'form-panel',
						name			: 'uploadForm',
						region			: 'center',
						width			: 75,
						height			: 22,
						standardSubmit	: false,
						border			:  false,
						url				: 'system/custom/aone/fileupload/set/upload1.do',
						timeout			: 120000,
						method			: 'POST',
						layout			: { type: 'vbox', align: 'stretch' } ,
						padding			: 0,
						margin			: '5 5 0 0',
						repeatTriggerClick	: true,
						style			: 'border-radius : 4px;',
						renderTo		: Ext.getBody(),
						items			: [
							{	xtype		: 'filefield',
								name		: 'files',
								itemId		: 'files',
								allowBlank	: false,
								anchor		: '100%',
								width		: 400,
								buttonText	: '업로드',
								buttonOnly	: true,
								buttonConfig: {
									width	: '100%',
									height	: '27px',
									margin	: '0 0 0 0',
								},
								regex		: new RegExp('\.(jpg|gif|png|pdf|xlsx|xlsm|xls)', 'i'), // 확장자 제한 정규식
								listeners	: {
									render	: function(field) {
										field.fileInputEl.set({
											multiple : true
										});
									},
									change	: function(field,value){
										me.upload();
									}
								}
							},{xtype:'hiddenfield', name:'param', value:''
							},{xtype:'hiddenfield', name:'token', value:_global.token_id}
						]
					},{	xtype:'button',
						text :'삭제',
						listeners:{
							click:function(){
								var params = this.up('grid').getSelectionModel().getSelection();
								var store = this.up('grid').getStore();

								if(params.length == 0){
									Ext.Msg.error("삭제할 파일을 선택해주세요." );
								}else{
									Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
										if (button == 'yes') {
											var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
											mask.show();

											Ext.each(params,function(rec){
												Ext.Ajax.request({
													url		: _global.location.http() + '/upload/get/fileDelete.do',
													params	: {
														token : _global.token_id,
														param : JSON.stringify({
															stor_id			: _global.stor_id,
															hqof_idcd		: _global.hqof_idcd,
															file_name		: rec.get('file_name'),
															orgn_dvcd		: "acpt_mast",
															invc_numb		: rec.get('invc_numb'),
															amnd_degr		: rec.get('amnd_degr'),
															line_seqn		: rec.get('line_seqn'),
															assi_seqn		: rec.get('assi_seqn'),
															uper_seqn		: rec.get('uper_seqn'),
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
														}
													},
													failure : function(result, request) {
														Ext.Msg.error(result.mesage);
													},
													callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
														mask.hide();
													}
												});
											})
										}
									});
								}
							}
						}
					}
				]

			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	xtype:'rownumberer'			, text : Language.get('seqn'			,'순번'		), width : 40 , align : 'center'
					},{ dataIndex: 'file_name'		, text : Language.get('file_name'		,'파일명'	), width : 200,
						renderer:function(val,meta,record){
							var title = val;
							if(record.get('file_ttle')!='' && record.get('file_ttle')!=undefined){
								title = record.get('file_ttle');
							}
							return '<a>'+title+'</a>'
						},
						listeners:{
							click : function(view,el,pos){
								var record = view.getStore().getAt(pos);
								Ext.Ajax.request({
									url		: _global.location.http() + '/upload/set/fileDownload.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											file_name		: record.get('file_name'),
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
											var url = './resource/downloadFile/'+record.get('file_name');
											window.open(url,"첨부파일",'width=500px,height=400px,scrollbars=yes');
										}
									},
									failure : function(result, request) {
										Ext.Msg.error(result.mesage);
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								setTimeout(function(){
									Ext.Ajax.request({
										url		: _global.location.http() + '/upload/set/localDelete.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												file_name		: record.get('file_name'),
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
											Ext.Msg.error(result.mesage);
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									})
								},60000);
							}
						}
					},{ dataIndex: 'upld_dttm'		, text : Language.get('upld_dttm'		,'업로드일시'	)	, width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		)	, flex  : 1, minWidth : 100
					}
				]
			}
		;
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return item;
	},
	upload : function(){
		var	me			= this.ownerCt.ownerCt.ownerCt.ownerCt,
			uploadForm	= me.down('[name=uploadForm]'),
			assi_seqn	= 0,
			store		= me.down('#grid3').getStore(),
			param		= {}
		;
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일을 확인해 주십시오.');
			return;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
		mask.show();

		Ext.Ajax.request({
			url			: _global.location.http() + '/upload/get/getfileseqn.do',				// apnd_file(업로드테이블)에서 seqn을 불러온다.
			params		: {
				token	: _global.token_id,
				param	: JSON.stringify({
					stor_id			: _global.stor_id,
					invc_numb		: me.params.acpt_numb,													//invc_numb와 orgn_dvcd(테이블명)이 필요하다.
					orgn_dvcd		: me.params.orgn_dvcd,
					line_seqn		: 0,
					uper_seqn		: me.params.prnt_idcd,
					hqof_idcd		: _global.hqof_idcd,
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
					if(result.records[0].assi_seqn != null){
						assi_seqn = Number(result.records[0].assi_seqn)+1;										// 받아온 line_seqn에 1더해서 저장
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */

				return false;
			}
		});

		param.stor_grp  = _global.stor_grp;
		param.stor_id   = _global.stor_id;
		param.orgn_dvcd = me.params.orgn_dvcd;
		param.invc_numb = me.params.acpt_numb;
		param.line_seqn = 0;
		param.uper_seqn = me.params.acpt_degr;
		param.hqof_idcd = _global.hqof_idcd;
		param.assi_seqn = assi_seqn;
		param.prnt_idcd = me.params.prnt_idcd?me.params.prnt_idcd:me.params.acpt_numb;
		param.file_dvcd_1fst = '3200'; //수리 후 이미지

		//개발자정의 파라미터 삽입


		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});
		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				Ext.Msg.alert( '', '업로드 성공 했습니다.' );
				store.reload();
				mask.hide();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '업로드 실패 했습니다.' );
				store.reload();
				mask.hide();
			},
			callback:function(){
			}
		});
	},
});
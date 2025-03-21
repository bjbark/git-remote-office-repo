Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderFilePopup', { extend: 'Axt.popup.Search',
	alias	: 'widget.lookup-hjsys-saleorder-file-popup',
	store	: 'module.custom.hjsys.sale.order.saleorder.store.SaleOrderFilePopup',

	title	: '도면 업로드',
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},
	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(tema){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				cls: tema,
				selModel	: {	selType: 'checkboxmodel', mode : 'SINGLE' },
				store		: Ext.create(me.store),
				defaults	: {style: 'text-align: center'},
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->',
						{	xtype			: 'form-panel',
							name			: 'uploadForm',
							region			: 'center',
							width			: 80,
							height			: 27,
							standardSubmit	: false,
							border			:  false,
							url				: 'system/custom/hjsys/sale/order/saleorder/set/fileUpload2.do',
							timeout			: 120000,
							method			: 'POST',
							layout			: { type: 'vbox', align: 'stretch' } ,
							padding			: 0,
							margin			: '5 0 0 0',
							repeatTriggerClick	: true,
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
										margin	: '0 0 0 0'
									},
									regex		: new RegExp('\.(jpg|gif|png|pdf)', 'i'), // 확장자 제한 정규식
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
						},'-',{	text: Const.DELETE.text ,
							iconCls: Const.DELETE.icon,
							cls: 'button-style',
							handler:function(){
								var params = me.down('grid').getSelectionModel().getSelection()[0];
								var store = me.down('grid').getStore();
								if(!params){
									Ext.Msg.error("삭제할 파일을 선택해주세요." );
								}else{
									Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
										if (button == 'yes') {
											var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
											mask.show();
											Ext.Ajax.request({
												url		: _global.location.http() + '/upload/get/fileDelete.do',
												params	: {
													token : _global.token_id,
													param : JSON.stringify({
														stor_id			: _global.stor_id,
														hqof_idcd		: _global.hqof_idcd,
														file_name		: params.data.file_name,
														orgn_dvcd		: "acpt_item",
														invc_numb		: params.data.invc_numb,
														line_seqn		: params.data.line_seqn,
														assi_seqn		: params.data.assi_seqn
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
										}
									});
								}
							}
						},
						'-',
						'->' ,
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'	)		, width : 80 , align : 'center',hidden:true
					},{	dataIndex: 'assi_seqn'		, text : Language.get('assi_seqn'		,'순번'	)		, width : 80 , align : 'center'
					},{ dataIndex: 'file_ttle'		, text : Language.get('file_ttle'		,'파일명')		, width : 120 ,hidden:true
					},{ dataIndex: 'file_name'		, text : Language.get('file_name'		,'파일명')		, flex : 1 ,
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
											window.open(url,'down','width=1400,height=800');
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
												console.log(result);
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
					},{
						dataIndex: 'file_size'		,
						text : Language.get('file_size'		,'파일크기'),
						width : 100 ,
						renderer: function(value) {
							return Ext.String.format(numberFmt(value)+'kb')
						},
						align : 'center'
					},{ dataIndex: 'upld_dttm'		, text : Language.get('upld_dttm'		,'업로드일시')	, width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, width : 200 ,
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'invc_numb')	, width : 200 , hidden:true
					}
				]
			}
		;
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return grid;
	},
	upload:function(){
		var	me			= this,
			orgn_dvcd	= 'acpt_item',
			params		= me.params,
			invc_numb	= params.invc_numb,
			line_seqn	= params.line_seqn,
			param		= {}
		;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
		mask.show();

		Ext.Ajax.request({
			url			: _global.location.http() + '/upload/get/getfileseqn.do',				// apnd_file(업로드테이블)에서 seqn을 불러온다.
			params		: {
				token	: _global.token_id,
				param	: JSON.stringify({
					stor_id			: _global.stor_id,
					invc_numb		: invc_numb,													//invc_numb와 orgn_dvcd(테이블명)이 필요하다.
					orgn_dvcd		: orgn_dvcd,
					line_seqn		: line_seqn,
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
		param.orgn_dvcd = orgn_dvcd;
		param.invc_numb = invc_numb;
		param.line_seqn = line_seqn;
		param.hqof_idcd = _global.hqof_idcd;
		param.assi_seqn = assi_seqn;
		param.file_dvcd_1fst = '3100'; //도면자료

		//개발자정의 파라미터 삽입

		// submit할 form가져오기
		var uploadForm = me.down('[name=uploadForm]');
		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span> 파일을 확인해 주십시오.');
			return;
		}
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});
		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				Ext.Msg.alert( '', '업로드 성공 했습니다.' );
				me.down('grid').select({
					callback:function(records, operation, success) {
						if (success) {
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '업로드 실패 했습니다.' );
				me.down('grid').select({
					callback:function(records, operation, success) {
						if (success) {
						} else {
						}
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}) );
			}
		});

	},

	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			param	= Ext.merge({hq_id : _global.hq_id },me.popup.params)
		;
		me.down('grid').select({
			callback:function(records, operation, success) {
				if (success) {
				} else {
				}
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
});

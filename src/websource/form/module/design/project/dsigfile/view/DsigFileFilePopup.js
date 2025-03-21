Ext.define('module.design.project.dsigfile.view.DsigFileFilePopup', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-dsigfile-file-popup',
	store	: 'module.design.project.dsigfile.store.DsigFileFile',
	title	: '첨부파일' ,
	closable: true,
	autoShow: true,
	width	: 665 ,
	height	: 361 ,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createForm(),me.createGrid()];
		me.callParent(arguments);
	},

	listeners:{
		render:function(){
			var store = this.down('grid').getStore(),
				param = Ext.merge( this.down('form').getValues(), {
					invc_numb :this.popup.params.invc_numb,
					orgn_dvcd :this.popup.params.orgn_dvcd,
					line_seqn :this.popup.params.line_seqn
				}, this.popup.params );
			store.load({
				params : { param:JSON.stringify(param) }, scope:this,
				callback:function(records, operation, success) {
				}
			});
		}
	},

	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			fbar	: [
				{	fieldLabel	: Language.get('file_name','파일첨부'),				// temp
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'file',
					pair		: 'file_name',
					labelStyle	: 'color:black',
					clearable	: false ,
					popup: {
						select : 'SINGLE',
						widget : 'module-dsigfile-upload-popup',
						params : {	stor_grp : _global.stor_grp ,
									line_stat : '0' ,
									line_seqn : this.popup.params.line_seqn,
									invc_numb : this.popup.params.invc_numb ,
									orgn_dvcd : this.popup.params.orgn_dvcd
						},
						result : function(records, nameField, pairField) {
							var store = me.down('grid').getStore();
							var store1 = Ext.ComponentQuery.query('module-dsigfile-tree')[0].getStore();
							store.reload();
							store1.reload();
						}
					},listeners:{
						render:function(){
							this.popup.params.orgn_dvcd = 'dsigfile';											// table name이 필요하다
						}
					},
				},{	xtype:'button',
					text :'삭제',
					listeners:{
						click:function(){
							var params = this.up('window').down('grid').getSelectionModel().getSelection()[0];
							var store = this.up('window').down('grid').getStore();
							var store1 = Ext.ComponentQuery.query('module-dsigfile-tree')[0].getStore();
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
													orgn_dvcd		: "dsigfile",
													invc_numb		: params.data.invc_numb,
													line_seqn		: params.data.line_seqn,
													assi_seqn		: params.data.assi_seqn,
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
													store1.reload();
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
					}
				},{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style', margin : '0 5 0 20'
				}
			]
		};
		return form;
	},


	createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'north',
				height		: 297,
				viewConfig	: {
					loadMask : new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				store		: Ext.create( me.store ),
				columns : [
					{	dataIndex: 'assi_seqn'		, text : Language.get('assi_seqn'		,'순번'	)		, width : 50 , align : 'center'
					},{ dataIndex: 'file_ttle'		, text : Language.get('file_ttle'		,'파일명')		, width : 120 ,hidden:true
					},{ dataIndex: 'file_name'		, text : Language.get('file_name'		,'파일명')		, width : 220 ,
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
					},{	dataIndex: 'file_size'		,
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



	//조회
	selectAction : function(){
		var  me = this,
			store = me.down('grid').getStore(),
			param = Ext.merge( me.down('form').getValues(), {hq_id : _global.hq_id
			}, me.popup.params );
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params:{param:JSON.stringify(param)}, scope:me,
			callback:function(records, operation, success) {
			}
		});
	},

	//확인
	finishAction: function(){
	}
});
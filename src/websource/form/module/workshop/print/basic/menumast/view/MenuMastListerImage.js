Ext.define('module.workshop.print.basic.menumast.view.MenuMastListerImage', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-workshop-menu-lister-image',

	store: 'module.workshop.print.basic.menumast.store.MenuMastImage',

	border : 0 ,
	columnLines: true ,
	features: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu'  } , { ptype:'gridcolumnconfig'  } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->',
					{	xtype: 'button' , text : '<span class="write-button">업로드</span>', scope: me, handler: me.upload, cls: 'button-style'
					},'-',{	text: Const.DELETE.text ,
						iconCls: Const.DELETE.icon,
						cls: 'button-style',
						handler:function(){
							var params = me.getSelectionModel().getSelection()[0];
							var store = me.getStore();
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
													orgn_dvcd		: "disp_gods_mast",
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
					}
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
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
//									async	: false,
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
					},{ dataIndex: 'file_dvcd_1fst'	, text : Language.get('file_dvcd_1fst'	,'파일분류'	)	, width : 100 , align : 'center',xtype:'lookupcolumn', lookupValue:resource.lookup('file_dvcd_1fst')
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, width : 200 ,
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'invc_numb')	, width : 200 , hidden:true
					}
				]
			};
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return item;
	},
	upload:function(){
		var	me			= this,
			orgn_dvcd	= 'disp_gods_mast',
			master		= Ext.ComponentQuery.query('module-workshop-menu-lister-master')[0];
			params		= master.getSelectionModel().getSelection()[0].data,
			invc_numb	= params.invc_numb,
			line_seqn	= 0,
			param		= {}
		;
		if(params){

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


			resource.loadPopup({
				select	: 'SINGLE',
				widget	: 'lookup-board-upload',
				params : { stor_grp : _global.stor_grp , invc_numb : invc_numb,line_seqn:line_seqn,assi_seqn:assi_seqn,orgn_dvcd : orgn_dvcd},
				result	: function(records) {
					me.getStore().reload();
				},
			})
		}
	},
 });

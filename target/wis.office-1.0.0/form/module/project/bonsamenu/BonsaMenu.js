Ext.define('module.project.bonsamenu.BonsaMenu', { extend   : 'Axt.app.Controller',

	models   : [
	     'module.project.bonsamenu.model.BonsaMenuMaster',
	     'module.project.bonsamenu.model.BonsaMenuDetail'
	],
	stores   : [
	     'module.project.bonsamenu.store.BonsaMenuMaster',
	     'module.project.bonsamenu.store.BonsaMenuDetail'
	],
	views    : [
	     'module.project.bonsamenu.view.BonsaMenuLayout',
         'module.project.bonsamenu.view.BonsaMenuListerMaster',
         'module.project.bonsamenu.view.BonsaMenuListerDetail',
         'module.project.bonsamenu.view.BonsaMenuSearch'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-bonsamenu-layout button[action=selectAction]'        : { click : me.selectAction },
			'module-bonsamenu-lister-master button[action=exportAction]' : { click : me.exportAction },
			'module-bonsamenu-lister-detail button[action=updateAction]' : { click : me.updateAction },
			'module-bonsamenu-lister-detail button[action=cancelAction]' : { click : me.cancelAction },
			'module-bonsamenu-lister-detail button[action=exportAction]' : { click : me.exportAction },
			'module-bonsamenu-lister-detail button[action=synchronizer]' : { click : me.synchronizer }, // 싱크
		    'module-bonsamenu-lister-master ' : {
				 selectionchange : me.attachRecord,
				 itemdblclick    : me.selectDetail
			},
		});
		me.callParent(arguments);
	},
	 pocket : {
		 layout : function () { return Ext.ComponentQuery.query('module-bonsamenu-layout')[0] },
		 search : function () { return Ext.ComponentQuery.query('module-bonsamenu-search')[0] },
		 lister : {
			 master : function () { return Ext.ComponentQuery.query('module-bonsamenu-lister-master')[0] },
			 detail : function () { return Ext.ComponentQuery.query('module-bonsamenu-lister-detail')[0] }
		 }
	},

	/**
	 * 조회
	 */
	selectAction:function() {
		var me     = this,
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), {} ));
	},

	/**
	 * 마스터 레코드가 변경이 될때
	 */
	attachRecord:function( grid, records ){
	    this.pocket.lister.detail().getStore().getRootNode().removeAll();
	},
	/**
	 *  디테일을 조회 한다.
	 */
	selectDetail : function(grid, record) {
		var me = this,
		    detail = me.pocket.lister.detail()
	    ;
		if (record){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			detail.getStore().load({
				params:{param:JSON.stringify({ hq_id : record.get('hq_id'),  hq_ver : record.get('hq_ver')})}, scope:me,
				callback : function(records, operation, success) {
					if (success) {
						detail.getRootNode().expand();
//						console.debug(detail.getRootNode())

						detail.getRootNode().cascadeBy(function( record ) {
							if (record.internalId != 'root') {
								if (record.get('row_sts') != 0) {
									record.set('active_yn' , false);
								}
							}
					  	});
						detail.getSelectionModel().select(0);

					} else { }
					mask.hide();
				}, scope    : me
			});
		}
	},


	/**
	 * 저장
	 */
	updateAction:function( ) {
		var me = this,
			lister = me.pocket.lister.detail()
		    changs = lister.getStore().getUpdatedRecords().length
		;

		if (changs>0){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			lister.getStore().sync({
				success : function(operation){  }, // 저장 성공시
				failure : function(operation){  }, // 저장 실패시 호출
				callback: function(operation){ mask.hide(); }
			});
		}
	},

	/**
	* 취소
	*/
	cancelAction:function() {
//		var me = this,
//
//		lister = me.pocket.lister.detail()
//		;

		this.pocket.lister.detail().getStore().rejectChanges();
		//lister.getStore().rejectChanges();
	},

	/**
	* 엑셀
	*/
	exportAction : function(button){
		var me = this,
		value = button.button
		;
		if ( value == 'master' ){
			this.pocket.lister.master().writer();
		}
	},

	/**
	 * 싱크
	 */
	synchronizer :function() {
		var me     = this,
		    lister = me.pocket.lister.master(),
		    select = lister.getSelectionModel().getSelection()[0]
		;
		if (select && (select.get('hq_ver') === 'N' || select.get('hq_ver') === '8')){
			Ext.Msg.show({
				msg: "메뉴 정보를 서버와 동기화 진행 하시겟습니까?" , buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button === 'yes'){
						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
						mask.show();
						Ext.Ajax.request({
							url: _global.location.http() +'/project/bonsamenu/set/resync.do',
							method:"POST",
							params: {
								token: _global.token_id,
								param: JSON.stringify({
									hq_id  : select.get('hq_id'  ),
									hq_ver : select.get('hq_ver' )
								})
							},
							success: function (response, request) {
								//var resobj = response;
								var result = Ext.decode(response.responseText);
								if (result.success){
									Ext.Msg.show({ msg: '동기화 성공', buttons: Ext.Msg.YES, icon: Ext.Msg.OK });
								}else{
									Ext.Msg.show({ msg: result.message, buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
								}
							},
							failure: function (response, request) {},
							callback : function() { mask.hide();}
						});
					}
				}
			});
		} else {
			Ext.Msg.show({ msg: '동기화를 할수 없습니다.', buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
		}
	}

});



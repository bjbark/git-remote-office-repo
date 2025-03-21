
Ext.define('Axt.popup.Search', {
	extend: 'Ext.window.Window',

    alias: 'widget.popup-search',

	closable: true,
	modal: true,

	owner: undefined, // 팝업 호출 창에서 호출한 객체로 설정 한다.
    popup: undefined,
	enterDelay : true,
	width: 700,
    height: 500,
    layout: {
        type: 'border'
    },
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.setKeyEvent();
		this.on('close', function() {
			var owner = me.owner;
			me.enterDelay = true;
			if (owner && owner.focus) {
				owner.focus(true, true);
			}
			if (me.popup && Ext.isFunction(me.popup.closed)) {
				me.popup.closed.call(this, me.selectRecords , this.owner );
			}
		});
	},
	/**
	 * 선택 된 상품분류코드 정보 설정
	 *
	 * @private
	 * @param {Ext.data.Model} records 반환값
	 */
	setResponse: function(records) {
		var me = this,
			pairField,
			onSelectedFn = me.onSelected
		;

		me.selectRecords = records ;
		if (me.popup && Ext.isFunction(me.popup.result)) {
			if (me.owner.pair) {
				pairField = me.owner.up('form' ).down('[name=' + me.owner.pair + ']');
				if (!pairField) {
					resource.showError( '['+ me.owner.pair + '] 필드를 찾을수 없습니다.' );
					return;
				}
			}
			me.popup.result.call(this, records, this.owner, pairField );
		}
		me.close();
	},

	/**
	 * 모든 grid의 store에 로드 마스크 이벤트 적용
	 */
//	setMaskEvent: function(controller, panel) {
//		var me = this,
//			grids = me.query('grid'),
//			index
//		;
//		for (index in grids) {
//		}
//	},
	/**
	 * 키이벤트 설정
	 *
	 * 엔터: 조회, ESC: 닫기
	 */
	/**
	 * 키이벤트 설정 엔터: 조회, ESC: 닫기
	 */
	setKeyEvent: function() {
		var me = this;

		var i = 0, searchFields = Ext.ComponentQuery.query('searchfield', me), searchField, focusDelay;
		for (; i < searchFields.length; i++) {
			searchField = searchFields[i];
			searchField.on('specialkey', function(f, e) {
				if (e.getKey() == e.ENTER) {

//					var searchButton = Ext.ComponentQuery.query('button[iconCls=' + Const.SELECT.icon +']', this)[0];
					var searchButton = Ext.ComponentQuery.query('button[action=' + Const.SELECT.action +']', this)[0];
					searchButton.handler.call(this);
				} else
				if (e.getKey() == e.DOWN ) {
					var grid = me.down('grid');
					if (grid) {
						if (grid.getStore().data.length > 0) {
							grid.getSelectionModel().select(0);
						}
					}
				}

			}, this);
		}
	}

});
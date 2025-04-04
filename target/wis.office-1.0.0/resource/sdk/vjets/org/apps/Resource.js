/*******************************************************************************
 * Copyright (c) 2012 eBay Inc. and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     eBay Inc. - initial API and implementation
 *******************************************************************************/
vjo.ctype('resources.sdk.vjetxs.org.apps.Resource') //< public
.globals({
	resource: null //< resources.sdk.vjetxs.org.apps.Resource
})
.protos({

	//>public void loadResource(Object)
	loadResource : vjo.NEEDS_IMPL,

	//>public void loadLanguage(Object)
	loadLanguage : vjo.NEEDS_IMPL,

	//>public Object getData(String) 
	getData : vjo.NEEDS_IMPL,
	
	//>public Array getList(String) 
	getList : vjo.NEEDS_IMPL,

	//>public String getWord(String, String) 
	getWord : vjo.NEEDS_IMPL,

	//>public String getText(String, String) 
	getText : vjo.NEEDS_IMPL,
	
	//>public Number httpError(Object) 
	httpError : vjo.NEEDS_IMPL,

	//>public void httpError(String) 
	showError : vjo.NEEDS_IMPL,
	
	//>public void loadPopup(Object) 
	loadPopup : vjo.NEEDS_IMPL


})
.options({
	metatype: true
})
.endType();
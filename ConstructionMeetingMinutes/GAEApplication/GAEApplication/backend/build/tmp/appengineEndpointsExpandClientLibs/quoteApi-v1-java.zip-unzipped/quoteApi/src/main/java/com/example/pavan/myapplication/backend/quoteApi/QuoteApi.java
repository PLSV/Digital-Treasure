/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * This code was generated by https://code.google.com/p/google-apis-client-generator/
 * (build: 2015-08-03 17:34:38 UTC)
 * on 2015-10-22 at 23:26:26 UTC 
 * Modify at your own risk.
 */

package com.example.pavan.myapplication.backend.quoteApi;

/**
 * Service definition for QuoteApi (v1).
 *
 * <p>
 * This is an API
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="" target="_blank">API Documentation</a>
 * </p>
 *
 * <p>
 * This service uses {@link QuoteApiRequestInitializer} to initialize global parameters via its
 * {@link Builder}.
 * </p>
 *
 * @since 1.3
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public class QuoteApi extends com.google.api.client.googleapis.services.json.AbstractGoogleJsonClient {

  // Note: Leave this static initializer at the top of the file.
  static {
    com.google.api.client.util.Preconditions.checkState(
        com.google.api.client.googleapis.GoogleUtils.MAJOR_VERSION == 1 &&
        com.google.api.client.googleapis.GoogleUtils.MINOR_VERSION >= 15,
        "You are currently running with version %s of google-api-client. " +
        "You need at least version 1.15 of google-api-client to run version " +
        "1.20.0 of the quoteApi library.", com.google.api.client.googleapis.GoogleUtils.VERSION);
  }

  /**
   * The default encoded root URL of the service. This is determined when the library is generated
   * and normally should not be changed.
   *
   * @since 1.7
   */
  public static final String DEFAULT_ROOT_URL = "https://myApplicationId.appspot.com/_ah/api/";

  /**
   * The default encoded service path of the service. This is determined when the library is
   * generated and normally should not be changed.
   *
   * @since 1.7
   */
  public static final String DEFAULT_SERVICE_PATH = "quoteApi/v1/";

  /**
   * The default encoded base URL of the service. This is determined when the library is generated
   * and normally should not be changed.
   */
  public static final String DEFAULT_BASE_URL = DEFAULT_ROOT_URL + DEFAULT_SERVICE_PATH;

  /**
   * Constructor.
   *
   * <p>
   * Use {@link Builder} if you need to specify any of the optional parameters.
   * </p>
   *
   * @param transport HTTP transport, which should normally be:
   *        <ul>
   *        <li>Google App Engine:
   *        {@code com.google.api.client.extensions.appengine.http.UrlFetchTransport}</li>
   *        <li>Android: {@code newCompatibleTransport} from
   *        {@code com.google.api.client.extensions.android.http.AndroidHttp}</li>
   *        <li>Java: {@link com.google.api.client.googleapis.javanet.GoogleNetHttpTransport#newTrustedTransport()}
   *        </li>
   *        </ul>
   * @param jsonFactory JSON factory, which may be:
   *        <ul>
   *        <li>Jackson: {@code com.google.api.client.json.jackson2.JacksonFactory}</li>
   *        <li>Google GSON: {@code com.google.api.client.json.gson.GsonFactory}</li>
   *        <li>Android Honeycomb or higher:
   *        {@code com.google.api.client.extensions.android.json.AndroidJsonFactory}</li>
   *        </ul>
   * @param httpRequestInitializer HTTP request initializer or {@code null} for none
   * @since 1.7
   */
  public QuoteApi(com.google.api.client.http.HttpTransport transport, com.google.api.client.json.JsonFactory jsonFactory,
      com.google.api.client.http.HttpRequestInitializer httpRequestInitializer) {
    this(new Builder(transport, jsonFactory, httpRequestInitializer));
  }

  /**
   * @param builder builder
   */
  QuoteApi(Builder builder) {
    super(builder);
  }

  @Override
  protected void initialize(com.google.api.client.googleapis.services.AbstractGoogleClientRequest<?> httpClientRequest) throws java.io.IOException {
    super.initialize(httpClientRequest);
  }

  /**
   * Create a request for the method "getQuote".
   *
   * This request holds the parameters needed by the quoteApi server.  After setting any optional
   * parameters, call the {@link GetQuote#execute()} method to invoke the remote operation.
   *
   * @param id
   * @return the request
   */
  public GetQuote getQuote(java.lang.Long id) throws java.io.IOException {
    GetQuote result = new GetQuote(id);
    initialize(result);
    return result;
  }

  public class GetQuote extends QuoteApiRequest<com.example.pavan.myapplication.backend.quoteApi.model.Quote> {

    private static final String REST_PATH = "quote/{id}";

    /**
     * Create a request for the method "getQuote".
     *
     * This request holds the parameters needed by the the quoteApi server.  After setting any
     * optional parameters, call the {@link GetQuote#execute()} method to invoke the remote operation.
     * <p> {@link
     * GetQuote#initialize(com.google.api.client.googleapis.services.AbstractGoogleClientRequest)}
     * must be called to initialize this instance immediately after invoking the constructor. </p>
     *
     * @param id
     * @since 1.13
     */
    protected GetQuote(java.lang.Long id) {
      super(QuoteApi.this, "GET", REST_PATH, null, com.example.pavan.myapplication.backend.quoteApi.model.Quote.class);
      this.id = com.google.api.client.util.Preconditions.checkNotNull(id, "Required parameter id must be specified.");
    }

    @Override
    public com.google.api.client.http.HttpResponse executeUsingHead() throws java.io.IOException {
      return super.executeUsingHead();
    }

    @Override
    public com.google.api.client.http.HttpRequest buildHttpRequestUsingHead() throws java.io.IOException {
      return super.buildHttpRequestUsingHead();
    }

    @Override
    public GetQuote setAlt(java.lang.String alt) {
      return (GetQuote) super.setAlt(alt);
    }

    @Override
    public GetQuote setFields(java.lang.String fields) {
      return (GetQuote) super.setFields(fields);
    }

    @Override
    public GetQuote setKey(java.lang.String key) {
      return (GetQuote) super.setKey(key);
    }

    @Override
    public GetQuote setOauthToken(java.lang.String oauthToken) {
      return (GetQuote) super.setOauthToken(oauthToken);
    }

    @Override
    public GetQuote setPrettyPrint(java.lang.Boolean prettyPrint) {
      return (GetQuote) super.setPrettyPrint(prettyPrint);
    }

    @Override
    public GetQuote setQuotaUser(java.lang.String quotaUser) {
      return (GetQuote) super.setQuotaUser(quotaUser);
    }

    @Override
    public GetQuote setUserIp(java.lang.String userIp) {
      return (GetQuote) super.setUserIp(userIp);
    }

    @com.google.api.client.util.Key
    private java.lang.Long id;

    /**

     */
    public java.lang.Long getId() {
      return id;
    }

    public GetQuote setId(java.lang.Long id) {
      this.id = id;
      return this;
    }

    @Override
    public GetQuote set(String parameterName, Object value) {
      return (GetQuote) super.set(parameterName, value);
    }
  }

  /**
   * Create a request for the method "insertQuote".
   *
   * This request holds the parameters needed by the quoteApi server.  After setting any optional
   * parameters, call the {@link InsertQuote#execute()} method to invoke the remote operation.
   *
   * @param content the {@link com.example.pavan.myapplication.backend.quoteApi.model.Quote}
   * @return the request
   */
  public InsertQuote insertQuote(com.example.pavan.myapplication.backend.quoteApi.model.Quote content) throws java.io.IOException {
    InsertQuote result = new InsertQuote(content);
    initialize(result);
    return result;
  }

  public class InsertQuote extends QuoteApiRequest<com.example.pavan.myapplication.backend.quoteApi.model.Quote> {

    private static final String REST_PATH = "quote";

    /**
     * Create a request for the method "insertQuote".
     *
     * This request holds the parameters needed by the the quoteApi server.  After setting any
     * optional parameters, call the {@link InsertQuote#execute()} method to invoke the remote
     * operation. <p> {@link
     * InsertQuote#initialize(com.google.api.client.googleapis.services.AbstractGoogleClientRequest)}
     * must be called to initialize this instance immediately after invoking the constructor. </p>
     *
     * @param content the {@link com.example.pavan.myapplication.backend.quoteApi.model.Quote}
     * @since 1.13
     */
    protected InsertQuote(com.example.pavan.myapplication.backend.quoteApi.model.Quote content) {
      super(QuoteApi.this, "POST", REST_PATH, content, com.example.pavan.myapplication.backend.quoteApi.model.Quote.class);
    }

    @Override
    public InsertQuote setAlt(java.lang.String alt) {
      return (InsertQuote) super.setAlt(alt);
    }

    @Override
    public InsertQuote setFields(java.lang.String fields) {
      return (InsertQuote) super.setFields(fields);
    }

    @Override
    public InsertQuote setKey(java.lang.String key) {
      return (InsertQuote) super.setKey(key);
    }

    @Override
    public InsertQuote setOauthToken(java.lang.String oauthToken) {
      return (InsertQuote) super.setOauthToken(oauthToken);
    }

    @Override
    public InsertQuote setPrettyPrint(java.lang.Boolean prettyPrint) {
      return (InsertQuote) super.setPrettyPrint(prettyPrint);
    }

    @Override
    public InsertQuote setQuotaUser(java.lang.String quotaUser) {
      return (InsertQuote) super.setQuotaUser(quotaUser);
    }

    @Override
    public InsertQuote setUserIp(java.lang.String userIp) {
      return (InsertQuote) super.setUserIp(userIp);
    }

    @Override
    public InsertQuote set(String parameterName, Object value) {
      return (InsertQuote) super.set(parameterName, value);
    }
  }

  /**
   * Builder for {@link QuoteApi}.
   *
   * <p>
   * Implementation is not thread-safe.
   * </p>
   *
   * @since 1.3.0
   */
  public static final class Builder extends com.google.api.client.googleapis.services.json.AbstractGoogleJsonClient.Builder {

    /**
     * Returns an instance of a new builder.
     *
     * @param transport HTTP transport, which should normally be:
     *        <ul>
     *        <li>Google App Engine:
     *        {@code com.google.api.client.extensions.appengine.http.UrlFetchTransport}</li>
     *        <li>Android: {@code newCompatibleTransport} from
     *        {@code com.google.api.client.extensions.android.http.AndroidHttp}</li>
     *        <li>Java: {@link com.google.api.client.googleapis.javanet.GoogleNetHttpTransport#newTrustedTransport()}
     *        </li>
     *        </ul>
     * @param jsonFactory JSON factory, which may be:
     *        <ul>
     *        <li>Jackson: {@code com.google.api.client.json.jackson2.JacksonFactory}</li>
     *        <li>Google GSON: {@code com.google.api.client.json.gson.GsonFactory}</li>
     *        <li>Android Honeycomb or higher:
     *        {@code com.google.api.client.extensions.android.json.AndroidJsonFactory}</li>
     *        </ul>
     * @param httpRequestInitializer HTTP request initializer or {@code null} for none
     * @since 1.7
     */
    public Builder(com.google.api.client.http.HttpTransport transport, com.google.api.client.json.JsonFactory jsonFactory,
        com.google.api.client.http.HttpRequestInitializer httpRequestInitializer) {
      super(
          transport,
          jsonFactory,
          DEFAULT_ROOT_URL,
          DEFAULT_SERVICE_PATH,
          httpRequestInitializer,
          false);
    }

    /** Builds a new instance of {@link QuoteApi}. */
    @Override
    public QuoteApi build() {
      return new QuoteApi(this);
    }

    @Override
    public Builder setRootUrl(String rootUrl) {
      return (Builder) super.setRootUrl(rootUrl);
    }

    @Override
    public Builder setServicePath(String servicePath) {
      return (Builder) super.setServicePath(servicePath);
    }

    @Override
    public Builder setHttpRequestInitializer(com.google.api.client.http.HttpRequestInitializer httpRequestInitializer) {
      return (Builder) super.setHttpRequestInitializer(httpRequestInitializer);
    }

    @Override
    public Builder setApplicationName(String applicationName) {
      return (Builder) super.setApplicationName(applicationName);
    }

    @Override
    public Builder setSuppressPatternChecks(boolean suppressPatternChecks) {
      return (Builder) super.setSuppressPatternChecks(suppressPatternChecks);
    }

    @Override
    public Builder setSuppressRequiredParameterChecks(boolean suppressRequiredParameterChecks) {
      return (Builder) super.setSuppressRequiredParameterChecks(suppressRequiredParameterChecks);
    }

    @Override
    public Builder setSuppressAllChecks(boolean suppressAllChecks) {
      return (Builder) super.setSuppressAllChecks(suppressAllChecks);
    }

    /**
     * Set the {@link QuoteApiRequestInitializer}.
     *
     * @since 1.12
     */
    public Builder setQuoteApiRequestInitializer(
        QuoteApiRequestInitializer quoteapiRequestInitializer) {
      return (Builder) super.setGoogleClientRequestInitializer(quoteapiRequestInitializer);
    }

    @Override
    public Builder setGoogleClientRequestInitializer(
        com.google.api.client.googleapis.services.GoogleClientRequestInitializer googleClientRequestInitializer) {
      return (Builder) super.setGoogleClientRequestInitializer(googleClientRequestInitializer);
    }
  }
}

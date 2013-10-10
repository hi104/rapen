class @VectorUtil

    @cross:(v1, v2) ->
        (v1.x * v2.y) - (v1.y * v2.x)

    @dot:(v1, v2) ->
        (v1.x * v2.x) + (v1.y * v2.y)

    # @rotMatrix:(r) =>
    #     c = Math.cos(r)
    #     s = Math.sin(r)
    #     [[c, -s],
    #      [s,  c]]

    # @scaleMatrix:(x, y) =>
    #     [[x, 0],
    #      [0, y]]


    # @multiplyMatrix:(a, b) =>
    #     ret = []
    #     for i in [0..a.length-1]
    #         arr = []
    #         for j in [0..b.length-1]
    #             val = 0
    #             for n in [0..b.length-1]
    #                 val += a[i][n] * b[n][j]
    #             arr.push val
    #         ret.push arr
    #     ret

    # @addMatrix:(a, b) =>
    #     ret = []
    #     for i in [0..a.length-1]
    #         arr = []
    #         for j in [0..a[0].length-1]
    #             val = a[i][j] + b[i][j]
    #             arr.push val
    #         ret.push arr
    #     ret
